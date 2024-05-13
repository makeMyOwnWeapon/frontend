import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

            const studyTime = totalStudySeconds - (sleepinessTime + distractionTime);
            setPieData([sleepinessTime, distractionTime, studyTime]);
    
            const formattedTimes = [
                (sleepinessTime / 60).toFixed(0), // 분단위 졸음 시간
                (distractionTime / 60).toFixed(0), // 분단위 산만함 시간
                (studyTime / 60).toFixed(0), // 분단위 공부 시간
                sleepinessTime, // 초단위 졸음 시간
                distractionTime, // 초단위 산만함 시간
                studyTime // 초단위 공부 시간
            ];
            setstudyTime(formattedTimes);         }
        
    }, [response]);


    const data = {
        labels: ['졸은 시간', '자리 비움', '공부 시간'],
        datasets: [
            {
                label: '# of Votes',
                data: pieData,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

    return <Pie data={data} />;
};

export default PieChart;
