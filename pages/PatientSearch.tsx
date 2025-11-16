
import React, { useState } from 'react';
import { api } from '../services/api';
import type { PatientSearchResponse, ApiError } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { SearchIcon } from '../components/icons/Icons';

const PatientSearch: React.FC = () => {
    const [patientId, setPatientId] = useState('synthetic-id-123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<PatientSearchResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!patientId) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await api.postPatientSummary({ patientId });
            setResult(response);
        } catch (err) {
            setError((err as ApiError).message || 'An unknown error occurred. The ngrok tunnel or backend deployment may be offline.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Maternal History Rapid Synthesis (MHRS-E)</h1>
                <p className="text-muted-foreground">Search and analyze maternal patient records.</p>
            </header>

            <Card>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder="Enter patient case ID"
                        className="flex-grow bg-input border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
                    />
                    <Button type="submit" disabled={loading} className="w-12 h-10 p-0">
                        {loading ? <Spinner /> : <SearchIcon className="w-5 h-5" />}
                    </Button>
                </form>
            </Card>

            {error && <Alert variant="destructive" title="Error" description={error} />}

            {result ? (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">MHRS-E Summary</h2>
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: result.summary }} />
                    <p className="text-sm text-muted-foreground mt-4">Patient ID: {result.patient_id}</p>
                </Card>
            ) : (
                !loading && (
                    <Card className="text-center text-muted-foreground">
                        <p>Enter a patient ID to retrieve their maternal history summary.</p>
                    </Card>
                )
            )}
        </div>
    );
};

export default PatientSearch;
