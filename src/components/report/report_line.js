import React, { useEffect, useState } from 'react';
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
            
            const sleepinessDuration = new Array((new Date(response.studyEndTime).getTime() - new Date(response.studyStartTime).getTime()) / 1000).fill(NaN);
            const distractionDuration = new Array((new Date(response.studyEndTime).getTime() - new Date(response.studyStartTime).getTime()) / 1000).fill(NaN);
            const startTime = new Date(response.studyStartTime);
            const endTime = new Date(response.studyEndTime);
            const labels = [];

            for (let i = 0; i <= sleepinessDuration.length; i++) {
                const time = new Date(i * 1000 + 54000000);
                labels.push(time.toISOString());
            }
    
            response.sleepinessAndDistraction.forEach((item) => {
                if (item.sleepinessStart && item.sleepinessEnd) {
                    const sleepinessStart = (new Date(item.sleepinessStart).getTime() - startTime.getTime()) / 1000;
                    const sleepinessEnd = (new Date(item.sleepinessEnd).getTime() - startTime.getTime()) / 1000;
                    for (let i = sleepinessStart; i <= sleepinessEnd; i++) {
                        sleepinessDuration[i] = 0.5;
                    }
                }
    
                if (item.distractionStart && item.distractionEnd) {
                    const distractionStart = (new Date(item.distractionStart).getTime() - startTime.getTime()) / 1000;
                    const distractionEnd = (new Date(item.distractionEnd).getTime() - startTime.getTime()) / 1000;
                    for (let i = distractionStart; i <= distractionEnd; i++) {
                        distractionDuration[i] = 0.5;
                    }
                }
            });
    
            setSleepinessData(sleepinessDuration);
            setDistractionData(distractionDuration);
            setStartTime(startTime.toISOString()); 
            setEndTime(endTime.toISOString());
            setLabels(labels);
        }
    }, [response]);
    useEffect(()=>{

    },[sleepinessData])
    const data = {
        labels: labels,
        datasets: [
            {
                label: '자리비움',
                data: distractionData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0,
                stepped: 'before',
                borderWidth: 50,  

            },
            {
                label: '졸음',
                data: sleepinessData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0,
                stepped: 'before',
                borderWidth: 50,
            },
        ]
    };

    const options = {
        elements: {
            point:{
                radius:0,
                hoverRadius:0,
                hoverBorderWidth:0
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
            legend: {
                display:false,
            },
            tooltip: {
                mode: 'point',
                intersect: false,
            },
        },
        scales: {
            x: {
                type: 'time', 
                time: {
                    unit: 'second', 
                    min: 0,  
                    max: (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000,
                    tooltipFormat: 'mm:ss',
                    displayFormats: {
                        millisecond: 'mm:ss',
                        second: 'mm:ss',
                        minute: 'mm:ss',
                        hour: 'HH:mm:ss',
                        day: 'HH:mm:ss',
                        week: 'HH:mm:ss',
                        month: 'HH:mm:ss',
                        quarter: 'HH:mm:ss',
                        year: 'HH:mm:ss'
                    },
                },
                grid:{
                    display : false
                }
            },
            
            y: {
                display:false,
                beginAtZero: true,
                max: 1,
                ticks: {
                    stepSize: 1
                },
                grid:{
                    display:false
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
