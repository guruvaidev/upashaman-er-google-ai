import React, { useState, Suspense, lazy } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../services/api';
// TriageInput is no longer used directly in this component
import type { TriageResponse, ApiError } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';

const ReactECharts = lazy(() => import('echarts-for-react'));

const triageSchema = z.object({
  chiefComplaint: z.string().min(1, 'Chief complaint is required').max(500),
  patientAge: z.coerce.number().min(0, 'Age must be positive').max(150),
  assignedGender: z.enum(['Female', 'Male', 'Other']),
  heartRate: z.coerce.number().min(0).max(300),
  bloodPressure: z.string().regex(/^\d{1,3}\/\d{1,3}$/, 'Format must be systolic/diastolic (e.g. 120/80)'),
  temperature: z.coerce.number().min(90).max(110),
  oxygenSaturation: z.coerce.number().min(0).max(100),
});

// Infer the form's data type directly from the Zod schema.
// This represents the validated and coerced data shape.
type TriageFormValues = z.infer<typeof triageSchema>;

const EchartSuspenseFallback = () => (
    <div className="flex justify-center items-center h-64 bg-secondary rounded-lg">
        <Spinner />
    </div>
);

const Triage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TriageResponse | null>(null);

  // FIX: By not providing a generic to useForm, it correctly infers the form's shape
  // from the zodResolver, which is the schema's *input* type. This resolves
  // type conflicts when using z.coerce.
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(triageSchema),
     defaultValues: {
        chiefComplaint: "atypical chest pain",
        patientAge: 35,
        assignedGender: "Female",
        heartRate: 80,
        bloodPressure: "120/80",
        temperature: 98.6,
        oxygenSaturation: 98,
    }
  });

  // The onSubmit handler receives data of the schema's *output* type (TriageFormValues),
  // which is correctly typed after validation and coercion.
  const onSubmit: SubmitHandler<TriageFormValues> = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await api.postTriageScore(data);
      setResult(response);
    } catch (err) {
      setError((err as ApiError).message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Acute Triage Disparity Scorer (APDS)</h1>
        <p className="text-muted-foreground">Assess potential triage bias for a patient.</p>
      </header>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label htmlFor="chiefComplaint" className="block text-sm font-medium mb-1">Chief Complaint</label>
                <textarea id="chiefComplaint" {...register('chiefComplaint')} rows={3} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.chiefComplaint && <p className="text-destructive text-sm mt-1">{errors.chiefComplaint.message}</p>}
            </div>
            
            <div>
                <label htmlFor="patientAge" className="block text-sm font-medium mb-1">Patient Age</label>
                <input type="number" id="patientAge" {...register('patientAge')} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.patientAge && <p className="text-destructive text-sm mt-1">{errors.patientAge.message}</p>}
            </div>

            <div>
                <label htmlFor="assignedGender" className="block text-sm font-medium mb-1">Assigned Gender</label>
                <select id="assignedGender" {...register('assignedGender')} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                </select>
                {errors.assignedGender && <p className="text-destructive text-sm mt-1">{errors.assignedGender.message}</p>}
            </div>

            <div>
                <label htmlFor="heartRate" className="block text-sm font-medium mb-1">Heart Rate (BPM)</label>
                <input type="number" id="heartRate" {...register('heartRate')} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.heartRate && <p className="text-destructive text-sm mt-1">{errors.heartRate.message}</p>}
            </div>

            <div>
                <label htmlFor="bloodPressure" className="block text-sm font-medium mb-1">Blood Pressure</label>
                <input type="text" id="bloodPressure" {...register('bloodPressure')} placeholder="e.g. 120/80" className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.bloodPressure && <p className="text-destructive text-sm mt-1">{errors.bloodPressure.message}</p>}
            </div>
            
            <div>
                <label htmlFor="temperature" className="block text-sm font-medium mb-1">Temperature (°F)</label>
                <input type="number" step="0.1" id="temperature" {...register('temperature')} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.temperature && <p className="text-destructive text-sm mt-1">{errors.temperature.message}</p>}
            </div>

            <div>
                <label htmlFor="oxygenSaturation" className="block text-sm font-medium mb-1">O₂ Saturation (%)</label>
                <input type="number" id="oxygenSaturation" {...register('oxygenSaturation')} className="w-full bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring" />
                {errors.oxygenSaturation && <p className="text-destructive text-sm mt-1">{errors.oxygenSaturation.message}</p>}
            </div>

            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full h-12">
                    {loading ? <Spinner /> : 'Calculate Score'}
                </Button>
            </div>
        </form>
      </Card>
      
      {error && <Alert variant="destructive" title="Error" description={error} />}

      {result && (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Assessment Result</h2>
            <div className="space-y-4">
                <p><strong className="text-primary">Summary:</strong> {result.summary}</p>
                <p><strong className="text-primary">Expert Guidance:</strong> {result.expert_guidance}</p>
                
                <Suspense fallback={<EchartSuspenseFallback />}>
                    <ReactECharts option={result.echartsOption} theme="dark" style={{ height: '300px' }}/>
                </Suspense>
            </div>
        </Card>
      )}
    </div>
  );
};

export default Triage;