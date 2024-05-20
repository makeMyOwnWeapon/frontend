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
    keyword:string;
  }
  
  interface gptSummary{
    summary: summary[];
  }
  
  export interface Data{
    gptAppQuestion:gptAppQuestion[];
    gptSummary:gptSummary;
    reports:reports;
  }
  interface reports {
    quizzes: Quiz[];
    sleepinessAndDistraction: SleepinessAndDistraction[];
    studyStartTime: string;
    studyEndTime: string;
  }