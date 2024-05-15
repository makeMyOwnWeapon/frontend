import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.font.family = 'Jua-Regular';
ChartJS.defaults.font.size = 16;

const PieChart = ({ response, setstudyTime }) => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        if (response && response.studyStartTime && response.studyEndTime) {
            const startTime = new Date(response.studyStartTime);
            const endTime = new Date(response.studyEndTime);
            const totalStudySeconds = (endTime.getTime() - startTime.getTime()) / 1000;
            let sleepinessTime = 0;
            let distractionTime = 0;
            
            response.sleepinessAndDistraction.forEach((item) => {
                if (item.sleepinessStart && item.sleepinessEnd) {
                    const sleepStart = new Date(item.sleepinessStart).getTime();
                    const sleepEnd = new Date(item.sleepinessEnd).getTime();
                    sleepinessTime += (sleepEnd - sleepStart) / 1000;
                }

                if (item.distractionStart && item.distractionEnd) {
                    const distractStart = new Date(item.distractionStart).getTime();
                    const distractEnd = new Date(item.distractionEnd).getTime();
                    distractionTime += (distractEnd - distractStart) / 1000;
                }
            });
            
            const realStudyTime = totalStudySeconds - (sleepinessTime + distractionTime);
            setPieData([sleepinessTime, distractionTime, realStudyTime]);
    
            const formattedTimes = [
                totalStudySeconds, sleepinessTime + distractionTime, realStudyTime
            ];
            setstudyTime(formattedTimes);         
        }
        
    }, [response]);

    const data = {
        labels: ['졸은 시간', '자리 비움', '공부 시간'],
        datasets: [
            {
                label: '# of Votes',
                data: pieData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: false,
            }
        }
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
