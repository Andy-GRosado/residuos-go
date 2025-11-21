// components/reports/form-report.tsx
import PrimaryButton from '@/components/ui/button/primary-button';
import { ControlledInput } from '@/components/ui/input/controlled-input';
import TextInput from '@/components/ui/input/input-text';
import TextAreaInput from '@/components/ui/input/input-text-area';
import ThemedText from '@/components/ui/themed-text';
import { ThemeConfigType } from '@/constants/theme';
import { ActivityIndicator, View, ViewProps } from 'react-native';
import { ReportFormData } from '../types/report.types';
import { ReportIssues } from './report-issues';

interface ReportFormProps {
  control: any; // Usamos any temporalmente para evitar conflictos de tipos
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  photoUri: string;
  themeColors: ThemeConfigType;
  containerProps?: ViewProps;
}

export default function ReportForm({
  control,
  onSubmit,
  onCancel,
  isSubmitting,
  photoUri,
  themeColors,
  containerProps
}: ReportFormProps) {
  
  const isFormDisabled = isSubmitting || !photoUri;

  return (
    <View style={[{ padding: 16, gap: 20 }, containerProps?.style]}>
      {/* Título */}
      <View>
        <ThemedText type="bodyBold" style={{ marginBottom: 8 }}>
          Título *
        </ThemedText>
        <ControlledInput<ReportFormData>
          name="title"
          control={control}
          placeholder="Describe brevemente el problema"
        >
          <TextInput
            maxLength={100}
            editable={!isFormDisabled}
          />
        </ControlledInput>
      </View>

      {/* Descripción */}
      <View>
        <ThemedText type="bodyBold" style={{ marginBottom: 8 }}>
          Descripción
        </ThemedText>
        <ControlledInput<ReportFormData>
          name="description"
          control={control}
          placeholder="Proporciona más detalles sobre el problema (opcional)"
        >
          <TextAreaInput
            maxLength={500}
            editable={!isFormDisabled}
            numberOfLines={3}
          />
        </ControlledInput>
      </View>

      {/* Issues Component - ESTE DEBE ESTAR DENTRO DEL FormProvider */}
      <ReportIssues disabled={isFormDisabled} />

      {/* Action Buttons */}
      <ActionButtons
        onCancel={onCancel}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        themeColors={themeColors}
        disabled={isFormDisabled}
      />
    </View>
  );
}

// Componente separado para botones
interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  themeColors: ThemeConfigType;
  disabled: boolean;
}

const ActionButtons = ({
  onCancel,
  onSubmit,
  isSubmitting,
  themeColors,
  disabled
}: ActionButtonsProps) => (
  <View style={{
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  }}>
    <PrimaryButton
      onPress={onCancel}
      disabled={isSubmitting}
      style={{
        flex: 1,
        backgroundColor: themeColors.background[300]
      }}
    >
      <ThemedText style={{ color: themeColors.text.default }}>
        Cancelar
      </ThemedText>
    </PrimaryButton>

    <PrimaryButton
      onPress={onSubmit}
      disabled={disabled || isSubmitting}
      style={{ flex: 1 }}
    >
      {isSubmitting ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <ThemedText style={{ color: 'white' }}>
          Publicar
        </ThemedText>
      )}
    </PrimaryButton>
  </View>
);