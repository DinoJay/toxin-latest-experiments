export const oecd401DefaultValues = {
    "endpoints.moribund_or_dead_male_animals_prior_to_study_termination": 'no',
    "endpoints.moribund_or_dead_female_animals_prior_to_study_termination": 'no',
    "test_method.test_condition.administration_scheme": 'single',
    "test_method.test_condition.oral_administration_gavage": 'gavage',
    "test_method.test_condition.observation_period": '14',
    "reliability.glp": 'no'
};

export const oecd402DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.observation_period': '14',
    'reliability.glp': 'no'
}
export const oecd420DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.administration_scheme': 'single',
    'test_method.test_condition.oral_administration_gavage': 'gavage',
    'test_method.test_condition.observation_period.recovery_period': '14',
    'reliability.glp': 'no'
};

export const oecd423DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.administration_scheme': 'single',
    'test_method.test_condition.oral_administration.gavage': 'gavage',
    'test_method.test_condition.observation_period': '14'


}

export const oecd425DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.administration_scheme': 'single',
    'test_method.test_condition.oral_administration.gavage': 'gavage',
    'test_method.test_condition.observation_period': '14',
    'test_method.test_condition.time_interval_between_treatment': '48h'
};

export const oecd407DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.repeated_administration_scheme': '7days/week',
    'test_method.test_condition.duration_of_exposure': '28',
    'test_method.test_condition.recovery_period': '14',
    'reliability.glp': 'no'
};

export const oecd408DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.repeated_administration_scheme': '7days/week',
    'test_method.test_condition.duration_of_exposure': '90 days',
    'test_method.test_condition.recovery_period': '28',
    'reliability.glp': 'no'
};

export const oecd409DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.repeated_administration_scheme': '7days/week',
    'test_method.test_condition.duration_of_exposure': '90 days',
    'reliability.glp': 'no'
};

export const oecd410DefaultValues = {

    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.repeated_administration_scheme': '7days/week',
    'test_method.test_condition.dermal_exposure.exposure_time_of_at_least_6h': '6h',
    'test_method.test_condition.dermal_exposure.patching': 'occluded',
    'test_method.test_condition.recovery_period': '14 days',
    'reliability.glp': 'no'
}

export const oecd411DefaultValues = oecd410DefaultValues

export const oecd412DefaultValues = {
    "endpoints.moribund_or_dead_animals_prior_to_study_termination": 'no',
    'test_method.test_condition.inhalation_exposure.duration_of_exposure': '6h',
    'test_method.test_condition.duration_of_exposure': '28 days',
    'reliability.glp': 'no'
};

export const oecd413DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.exposure_period_day': '90 days',
    'test_method.test_condition.inhalation_exposure.duration_of_exposure': '6h',
    'reliability.glp': 'no'
};

export const oecd422DefaultValues = {
    'endpoints.moribund_or_dead_animals_prior_to_study_termination': 'no',
    'test_method.test_condition.repeated_administration_scheme': '7 days/week',
    'test_method.test_condition.duration_of_exposure.males': '28d',
    'test_method.test_condition.duration_of_exposure.females': '54d',
    'test_method.test_condition.recovery_period': '14',
    'reliability.glp': 'no'
};

export const allDefaultValues = {
    ...oecd401DefaultValues,
    ...oecd402DefaultValues,
    ...oecd420DefaultValues,
    ...oecd423DefaultValues,
    ...oecd425DefaultValues,
    ...oecd407DefaultValues,
    ...oecd408DefaultValues,
    ...oecd409DefaultValues,
    ...oecd410DefaultValues,
    ...oecd411DefaultValues,
    ...oecd412DefaultValues,
    ...oecd413DefaultValues,
    ...oecd422DefaultValues
}

export const getDefaultValues = (guidelineLabel) => {

    let defaultValues = {};
    if (guidelineLabel === 'OECD 401') defaultValues = oecd401DefaultValues;
    else if (guidelineLabel === 'OECD 402') {
        defaultValues = oecd402DefaultValues;
    } else if (guidelineLabel === 'OECD 420') {
        defaultValues = oecd420DefaultValues;
    } else if (guidelineLabel === 'OECD 423') {
        defaultValues = oecd423DefaultValues;
    } else if (guidelineLabel === 'OECD 425') {
        defaultValues = oecd425DefaultValues;
    } else if (guidelineLabel === 'OECD 407') {
        defaultValues = oecd407DefaultValues;
    } else if (guidelineLabel === 'OECD 408') {
        defaultValues = oecd408DefaultValues;
    } else if (guidelineLabel === 'OECD 409') {
        defaultValues = oecd409DefaultValues;
    } else if (['OECD 410', 'OECD 411'].includes(guidelineLabel)) {
        defaultValues = oecd410DefaultValues;
    } else if (guidelineLabel === 'OECD 412') {
        defaultValues = oecd412DefaultValues;
    } else if (guidelineLabel === 'OECD 413') {
        defaultValues = oecd413DefaultValues;
    } else if (guidelineLabel === 'OECD 422') {
        defaultValues = oecd422DefaultValues;
    }
    return defaultValues

}