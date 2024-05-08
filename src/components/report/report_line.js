import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const LineChart = ({ response }) => {

    const [sleepinessData, setSleepinessData] = useState([]);
    const [distractionData, setDistractionData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    
    useEffect(() => {
        if (response && response.studyStartTime && response.studyEndTime) {
            const labels = [];
            const sleepinessDuration = new Array((new Date(response.studyEndTime).getTime() - new Date(response.studyStartTime).getTime()) / 1000).fill(NaN);
            const distractionDuration = new Array((new Date(response.studyEndTime).getTime() - new Date(response.studyStartTime).getTime()) / 1000).fill(NaN);
            const startTime = new Date(response.studyStartTime);
            const endTime = new Date(response.studyEndTime);
            
            // 한국 표준시(UTC+9)로 변환
            const krStartTime = new Date(startTime.getTime() + (9 * 60 * 60 * 1000));
            const krEndTime = new Date(endTime.getTime() + (9 * 60 * 60 * 1000));
    
            for (let i = 0; i < sleepinessDuration.length; i++) {
                const time = new Date(krStartTime.getTime() + i * 1000);
                labels.push(time.toISOString());
            }
    
            response.sleepinessAndDistraction.forEach((item) => {
                if (item.sleepinessStart && item.sleepinessEnd) {
                    const sleepinessStart = (new Date(item.sleepinessStart).getTime() - startTime.getTime()) / 1000;
                    const sleepinessEnd = (new Date(item.sleepinessEnd).getTime() - startTime.getTime()) / 1000;
                    for (let i = sleepinessStart; i <= sleepinessEnd; i++) {
                        sleepinessDuration[i] = 1;
                    }
                }
    
                if (item.distractionStart && item.distractionEnd) {
                    const distractionStart = (new Date(item.distractionStart).getTime() - startTime.getTime()) / 1000;
                    const distractionEnd = (new Date(item.distractionEnd).getTime() - startTime.getTime()) / 1000;
                    for (let i = distractionStart; i <= distractionEnd; i++) {
                        distractionDuration[i] = 1;
                    }
                }
            });
    
            setSleepinessData(sleepinessDuration);
            setDistractionData(distractionDuration);
            setStartTime(krStartTime.toISOString()); 
            setEndTime(krEndTime.toISOString());
            setLabels(labels);
        }
    }, [response]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: '졸음',
                data: sleepinessData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                borderWidth: 70,
                pointRadius: 0,  // 데이터 포인트 표시 없음
                borderCapStyle: 'butt'  // 라인의 끝을 사각형으로 설정
            },
            {
                label: '자리비움',
                data: distractionData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0,
                // borderCapStyle: 'square',
                stepped: 'before',
                borderWidth: 70
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 10,
                    usePointStyle: true,
                    boxWidth: 0.01,
                    boxHeight: 0.01
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                type: 'time', 
                time: {
                    unit: 'minute', 
                    min: startTime, // 시작 시간을 사용
                    max: new Date(endTime).getTime() - new Date(startTime).getTime(), // 밀리초 값으로 변환된 시간 간격을 사용
        
                    displayFormats: {
                        minute: 'HH:mm',
                        hour: 'HH:mm:ss', 
                        day: 'YYYY-MM-DD', 
                    },
                },
            },
            
            y: {
                beginAtZero: true,
                max: 2,
                ticks: {
                    stepSize: 1
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };
    return <Line data={data} options={options} />;
};

export default LineChart;
