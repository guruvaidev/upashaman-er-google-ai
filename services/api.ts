import type { TriageInput, TriageResponse, PatientSearchInput, PatientSearchResponse, EquityInput, EquityResponse, ApiError } from '../types';

// Hardcode these values to prevent crash on load. The `process` object is not available in this environment.
const API_BASE_URL = 'https://upashaman-er-api-xyz-uc.a.run.app';
const AUTH_CREDENTIALS = 'upashaman:Upashaman-ERReliefCriticalConditions';


function getAuthHeader(): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(AUTH_CREDENTIALS)}`);
    headers.append('Content-Type', 'application/json');
    return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.detail || errorMessage;
        } catch (e) {
            // Ignore if response body is not JSON
        }
        throw new Error(errorMessage);
    }
    return response.json();
}

const createMockTriageResponse = (data: TriageInput, guidance: string): TriageResponse => {
    const score = Math.random() * (0.8 - 0.1) + 0.1;
    const summary = `Based on the provided vitals, the patient (${data.patientAge}, ${data.assignedGender}) presenting with "${data.chiefComplaint}" has a calculated disparity risk score of ${score.toFixed(2)}.`;
    const echartsOption = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 1,
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [
                            [0.3, '#67e8f9'],
                            [0.7, '#facc15'],
                            [1, '#f87171']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: { color: 'auto' }
                },
                axisTick: { length: 12, lineStyle: { color: 'auto', width: 2 }},
                splitLine: { length: 20, lineStyle: { color: 'auto', width: 5 }},
                axisLabel: { show: false },
                title: { offsetCenter: [0, '-20%'], fontSize: 20, color: '#fff' },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: (value: number) => Math.round(value * 100),
                    color: 'auto'
                },
                data: [{ value: score, name: 'Disparity Risk' }]
            }
        ]
    };

    return {
        triage_input: data,
        score: score,
        summary: summary,
        echartsOption: echartsOption,
        expert_guidance: guidance,
    };
};


export const api = {
    postTriageScore: async (data: TriageInput): Promise<TriageResponse> => {
        // MOCK IMPLEMENTATION
        console.log("Using mocked API for postTriageScore for stability.", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockedGuidance = "This is a mocked clinical tip. For patients presenting with atypical symptoms, consider a broader differential diagnosis to account for potential presentation differences in this demographic.";
        return Promise.resolve(createMockTriageResponse(data, mockedGuidance));
    },

    postPatientSummary: async (data: PatientSearchInput): Promise<PatientSearchResponse> => {
        // MOCK IMPLEMENTATION
        console.log("Using mocked API for postPatientSummary", data);
        await new Promise(resolve => setTimeout(resolve, 800));

        const summaryHtml = `
            <h3>MHRS-E Summary for Patient ID: ${data.patientId}</h3>
            <p>This is a synthetically generated summary for demonstration purposes.</p>
            <h4>Key Risk Factors:</h4>
            <ul>
                <li>History of preeclampsia (2018)</li>
                <li>Gestational Diabetes Mellitus (GDM) in previous pregnancy</li>
                <li>Advanced Maternal Age (35)</li>
            </ul>
            <h4>Past Complications:</h4>
            <ul>
                <li>Preterm labor at 34 weeks (2018)</li>
                <li>Postpartum hemorrhage requiring transfusion</li>
            </ul>
            <h4>Allergies:</h4>
            <p>Penicillin (causes rash)</p>
        `;

        const response: PatientSearchResponse = {
            patient_id: data.patientId,
            summary: summaryHtml,
        };

        return Promise.resolve(response);
    },

    postExploreEquity: async (data: EquityInput): Promise<EquityResponse> => {
        // MOCK IMPLEMENTATION
        console.log("Using mocked API for postExploreEquity", data);
        await new Promise(resolve => setTimeout(resolve, 1200));

        const scoreA = Math.random() * (0.4 - 0.1) + 0.1;
        const scoreB = Math.random() * (0.6 - 0.2) + 0.2;

        const summary = `Profile A (${data.profileA.race}) shows a calculated disparity risk of ${scoreA.toFixed(2)}, while Profile B (${data.profileB.race}) shows a risk of ${scoreB.toFixed(2)}. This highlights potential systemic disparities in triage risk based on demographic factors.`;

        const echartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                textStyle: { color: 'hsl(var(--card-foreground))' }
            },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLabel: { color: 'hsl(var(--muted-foreground))' }
            },
            yAxis: {
                type: 'category',
                data: ['Profile B', 'Profile A'],
                axisLabel: { color: 'hsl(var(--muted-foreground))' }
            },
            series: [{
                name: 'Disparity Risk Score',
                type: 'bar',
                data: [
                    { value: parseFloat(scoreB.toFixed(2)), itemStyle: { color: 'hsl(var(--destructive))' } },
                    { value: parseFloat(scoreA.toFixed(2)), itemStyle: { color: 'hsl(var(--primary))' } }
                ],
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    color: 'hsl(var(--foreground))'
                }
            }],
            backgroundColor: 'transparent'
        };
        
        const response: EquityResponse = {
            equity_input: data,
            summary: summary,
            echartsOption: echartsOption
        };
        
        return Promise.resolve(response);
    },
};