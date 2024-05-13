interface SleepinessAndDistraction {
    sleepinessStart: string | null;
    sleepinessEnd: string | null;
    distractionStart: string | null;
    distractionEnd: string | null;
  }
  
  interface Quiz {
    choices: Choice[];
    commentary:string;
    isCorrect:boolean;
    question:string;
    solvedDuration:number;
    userChoice:string;
  }
  
  interface Choice {
    content: string;
    isAnswer: boolean;
  }
  
  interface gptAppQuestion {
    choices: Choice[];
    commentary:string;
    instruction:string;
  }
  
  interface summary{
    reviews:string;
  }
  
  interface gptSummery{
    summary: summary[];
  }
  
  export interface Data{
    gptAppQuestion:gptAppQuestion[];
    gptSummery:gptSummery;
    readHistoryReport:readHistoryReport;
  }
  interface readHistoryReport {
    quizzes: Quiz[];
    sleepinessAndDistraction: SleepinessAndDistraction[];
    studyStartTime: string;
    studyEndTime: string;
  }