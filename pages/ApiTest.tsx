
import React, { useState } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

type TestStatus = 'idle' | 'pending' | 'success' | 'error';

interface TestState {
    name: string;
    status: TestStatus;
    result: any | null;
    error: string | null;
    duration: number | null;
    run: () => Promise<any>;
}

const ApiTest: React.FC = () => {
    const initialTests: TestState[] = [
        {
            name: 'POST /triage-score',
            status: 'idle', result: null, error: null, duration: null,
            run: () => api.postTriageScore({
                chiefComplaint: "atypical chest pain",
                patientAge: 35, assignedGender: "Female",
                heartRate: 80, bloodPressure: "120/80",
                temperature: 98.6, oxygenSaturation: 98
            })
        },
        {
            name: 'POST /patient-summary',
            status: 'idle', result: null, error: null, duration: null,
            run: () => api.postPatientSummary({ patientId: "synthetic-id-123" })
        },
        {
            name: 'POST /explore-equity',
            status: 'idle', result: null, error: null, duration: null,
            run: () => api.postExploreEquity({
                profileA: { age: 35, gender: "Female", race: "Caucasian", zip_code: "90210" },
                profileB: { age: 35, gender: "Female", race: "African American", zip_code: "90210" }
            })
        }
    ];

    const [tests, setTests] = useState<TestState[]>(initialTests);
    const [isRunningAll, setIsRunningAll] = useState(false);

    const runTest = async (index: number) => {
        setTests(prev => prev.map((t, i) => i === index ? { ...t, status: 'pending', result: null, error: null, duration: null } : t));
        const startTime = Date.now();
        try {
            const result = await tests[index].run();
            const duration = Date.now() - startTime;
            setTests(prev => prev.map((t, i) => i === index ? { ...t, status: 'success', result, duration } : t));
        } catch (err: any) {
            const duration = Date.now() - startTime;
            setTests(prev => prev.map((t, i) => i === index ? { ...t, status: 'error', error: err.message, duration } : t));
        }
    };

    const runAllTests = async () => {
        setIsRunningAll(true);
        setTests(initialTests); // Reset tests
        for (let i = 0; i < tests.length; i++) {
            await runTest(i);
        }
        setIsRunningAll(false);
    };
    
    const getStatusIndicator = (status: TestStatus) => {
        switch (status) {
            case 'pending': return <Spinner />;
            case 'success': return <span className="text-green-400">✔ Success</span>;
            case 'error': return <span className="text-destructive">✖ Error</span>;
            default: return <span className="text-muted-foreground">Idle</span>;
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold">API Test Dashboard</h1>
                <p className="text-muted-foreground">Test the health of all backend endpoints.</p>
            </header>

            <Button onClick={runAllTests} disabled={isRunningAll} className="w-full h-12">
                {isRunningAll ? <Spinner /> : 'Run All Tests'}
            </Button>
            
            <div className="space-y-4">
                {tests.map((test, index) => (
                    <Card key={index}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{test.name}</h3>
                            <div className="flex items-center space-x-2">
                                {test.duration && <span className="text-sm text-muted-foreground">{test.duration}ms</span>}
                                {getStatusIndicator(test.status)}
                            </div>
                        </div>
                        {test.result && (
                            <div className="mt-4 p-2 bg-secondary rounded-md text-xs overflow-x-auto">
                                <pre>{JSON.stringify(test.result, null, 2)}</pre>
                            </div>
                        )}
                        {test.error && (
                            <div className="mt-4 p-2 bg-destructive/20 text-destructive rounded-md text-xs">
                                {test.error}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ApiTest;
