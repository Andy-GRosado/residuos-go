// components/reports/report-issues.tsx
import ThemedCheckbox from '@/src/shared/components/checkbox';
import ThemedText from '@/src/shared/components/themed-text';
import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { ReportFormData, ReportIssue } from '../types/report.types';

const ISSUES_CONFIG: { id: ReportIssue; label: string }[] = [
  { id: 'mal olor', label: 'Mal olor' },
  { id: 'mala apariencia', label: 'Mal aspecto' },
  { id: 'presencia de roedores', label: 'Presencia de roedores' }
];

interface ReportIssuesProps {
  disabled?: boolean;
}

export const ReportIssues = ({ disabled = false }: ReportIssuesProps) => {
  const { control, setValue } = useFormContext<ReportFormData>();
  
  const issues = useWatch({
    control,
    name: 'issues',
    defaultValue: []
  });

  const toggleIssue = (issue: ReportIssue) => {
    const updatedIssues = issues.includes(issue)
      ? issues.filter(item => item !== issue)
      : [...issues, issue];
    
    setValue('issues', updatedIssues, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  const hasIssuesSelected = issues.length > 0;

  return (
    <View>
      <ThemedText type="bodyBold" style={{ marginBottom: 12 }}>
        Tipo de problema *
      </ThemedText>
      
      <View style={{ gap: 12 }}>
        {ISSUES_CONFIG.map(({ id, label }) => (
          <ThemedCheckbox
            key={id}
            value={issues.includes(id)}
            onValueChange={() => toggleIssue(id)}
            label={label}
            disabled={disabled}
          />
        ))}
      </View>
      
      {!hasIssuesSelected && (
        <ThemedText style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
          Debe seleccionar al menos un tipo de problema
        </ThemedText>
      )}
    </View>
  );
};