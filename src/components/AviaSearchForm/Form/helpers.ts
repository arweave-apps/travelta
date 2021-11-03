import {
  FormSegmentId,
  FormSegments,
} from '../../../redux/reducers/aviaParams';
import { InitialValues } from '../helpers';

export const handleSwitchCities = (
  segments: FormSegments,
  formikSetValues: (
    formikValuesFromInput: React.SetStateAction<InitialValues>,
    shouldValidate?: boolean | undefined
  ) => void,
  segmentId: string
): void => {
  const newSegments = segments.map((segment) => {
    return segment.id === segmentId
      ? {
          ...segment,
          origin: segment.destination,
          originCode: segment.destinationCode,
          destination: segment.origin,
          destinationCode: segment.originCode,
        }
      : segment;
  });

  formikSetValues({ formSegments: newSegments });
};

export const handleResetDate = (
  segments: FormSegments,
  formikSetValues: (
    formikValuesFromInput: React.SetStateAction<InitialValues>,
    shouldValidate?: boolean | undefined
  ) => void,
  segmentId: string
): void => {
  const newSegments = segments.map((segment) => {
    if (segment.id !== segmentId) {
      return {
        ...segment,
        departureDate: null,
      };
    }
    return segment;
  });

  formikSetValues({ formSegments: newSegments });
};

export const handleAddSegment = (
  segments: FormSegments,
  formikSetValues: (
    formikValuesFromInput: React.SetStateAction<InitialValues>,
    shouldValidate?: boolean | undefined
  ) => void
): void => {
  if (segments.length > 5) {
    return;
  }

  const id = `segment-${segments.length + 1}` as FormSegmentId;

  const newSegment = {
    id,
    origin: '',
    originCode: '',
    destination: '',
    destinationCode: '',
    departureDate: null,
    returnDate: null,
  };

  formikSetValues({
    formSegments: [...segments, newSegment],
  });
};
