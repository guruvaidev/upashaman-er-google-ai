import React, { useState, Suspense, lazy } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../services/api';
// EquityProfile is no longer used directly in this component
import type { EquityResponse, ApiError } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';

const ReactECharts = lazy(() => import('echarts-for-react'));

const profileSchema = z.object({
  age: z.coerce.number().min(0).max(150),
  gender: z.enum(['Female', 'Male', 'Other']),
  race: z.string().min(1, 'Race is required'),
  zip_code: z.string().min(1, 'ZIP code is required'),
});

// Combine individual profile schemas into a single schema for the entire form.
const equitySchema = z.object({
    profileA: profileSchema,
    profileB: profileSchema,
});

// Infer the form's data type from the combined Zod schema.
// This represents the validated and coerced data shape.
type EquityFormValues = z.infer<typeof equitySchema>;


const ProfileForm: React.FC<{ profileId: 'A' | 'B'; register: any; errors: any }> = ({ profileId, register, errors }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Profile {profileId}</h3>
        <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input type="number" {...register(`profile${profileId}.age`)} className="w-full bg-input border border-border rounded-md p-2" />
            {errors[`profile${profileId}`]?.age && <p className="text-destructive text-sm mt-1">{errors[`profile${profileId}`].age.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select {...register(`profile${profileId}.gender`)} className="w-full bg-input border border-border rounded-md p-2">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Race</label>
            <input type="text" {...register(`profile${profileId}.race`)} className="w-full bg-input border border-border rounded-md p-2" />
            {errors[`profile${profileId}`]?.race && <p className="text-destructive text-sm mt-1">{errors[`profile${profileId}`].race.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input type="text" {...register(`profile${profileId}.zip_code`)} className="w-full bg-input border border-border rounded-md p-2" />
            {errors[`profile${profileId}`]?.zip_code && <p className="text-destructive text-sm mt-1">{errors[`profile${profileId}`].zip_code.message}</p>}
        </div>
    </div>
);

const EchartSuspenseFallback = () => (
    <div className="flex justify-center items-center h-64 bg-secondary rounded-lg">
        <Spinner />
    </div>
);


const Equity: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<EquityResponse | null>(null);

    // FIX: By not providing a generic to useForm, it correctly infers the form's shape
    // from the zodResolver, which is the schema's *input* type. This resolves
    // type conflicts when using z.coerce.
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(equitySchema),
        defaultValues: {
            profileA: { age: 35, gender: 'Female', race: 'Caucasian', zip_code: '90210' },
            profileB: { age: 35, gender: 'Female', race: 'African American', zip_code: '90210' },
        }
    });

    // The onSubmit handler receives data of the schema's *output* type (EquityFormValues),
    // which is correctly typed after validation and coercion.
    const onSubmit: SubmitHandler<EquityFormValues> = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await api.postExploreEquity(data);
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
                <h1 className="text-2xl font-bold">Health Equity Analysis</h1>
                <p className="text-muted-foreground">Compare disparity risk scores between two demographic profiles.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProfileForm profileId="A" register={register} errors={errors} />
                        <ProfileForm profileId="B" register={register} errors={errors} />
                    </div>
                    <div className="mt-8">
                        <Button type="submit" disabled={loading} className="w-full h-12">
                            {loading ? <Spinner /> : 'Compare Profiles'}
                        </Button>
                    </div>
                </Card>
            </form>

            {error && <Alert variant="destructive" title="Error" description={error} />}

            {result && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Comparison Result</h2>
                    <div className="space-y-4">
                        <p>{result.summary}</p>
                        <Suspense fallback={<EchartSuspenseFallback />}>
                            <ReactECharts option={result.echartsOption} theme="dark" style={{ height: '400px' }} />
                        </Suspense>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Equity;