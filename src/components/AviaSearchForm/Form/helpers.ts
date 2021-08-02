import { InitialValues, SegmentType } from '../helpers';

export const handleSwitchCities = (
  segments: SegmentType[],
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

  formikSetValues({ segments: newSegments });
};

export const handleResetDate = (
  segments: SegmentType[],
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

  formikSetValues({ segments: newSegments });
};

export const handleAddSegment = (
  segments: SegmentType[],
  formikSetValues: (
    formikValuesFromInput: React.SetStateAction<InitialValues>,
    shouldValidate?: boolean | undefined
  ) => void
): void => {
  if (segments.length > 5) {
    return;
  }

  const newSegment = {
    id: `segment-${segments.length + 1}`,
    origin: '',
    originCode: '',
    destination: '',
    destinationCode: '',
    departureDate: null,
    returnDate: null,
  };

  formikSetValues({
    segments: [...segments, newSegment],
  });
};
