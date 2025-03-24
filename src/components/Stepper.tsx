import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-indigo-600 text-white' 
                      : isActive 
                        ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-600' 
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                </div>
                <span 
                  className={`mt-2 text-xs font-medium ${
                    isCompleted || isActive ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              
              {step.id !== steps.length && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;