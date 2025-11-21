// hooks/forms/use-report-issues.ts
import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ReportFormData, ReportIssue } from '../types/report.types';

export const useReportIssues = () => {
  const formContext = useFormContext<ReportFormData>();
  
  // Verifica que el formContext exista
  if (!formContext) {
    throw new Error('useReportIssues debe usarse dentro de un FormProvider');
  }

  const { control, setValue } = formContext;
  
  // Usa useWatch en lugar de watch para reactividad automática
  const issues = useWatch({
    control,
    name: 'issues',
    defaultValue: []
  });

  const toggleIssue = useCallback((issue: ReportIssue) => {
    const updatedIssues = issues.includes(issue)
      ? issues.filter(item => item !== issue)
      : [...issues, issue];
    
    setValue('issues', updatedIssues, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  }, [issues, setValue]);

  const hasIssuesSelected = issues.length > 0;

  return {
    issues,
    toggleIssue,
    hasIssuesSelected
  };
};