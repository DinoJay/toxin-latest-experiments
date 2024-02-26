export default function klimischScoreRepeatedDoseToxicity(study) {

    const guideline = study.guidelineLabel

    const c1q1 = guideline !== 'non OECD' ? 1 : 0

    let c1q2 = undefined
    if (guideline === 'OECD 407') {
        c1q2 = study.test_method?.test_condition?.test_substance?.purity !== undefined ? 1 : 0

    } else if (guideline !== 'Non OECD') {
        c1q2 = study.test_method?.test_substance?.purity !== undefined ? 1 : 0
    }

    let c1q3 = undefined
    if (guideline === 'OECD 407') {
        c1q3 = study.test_method?.test_condition?.test_substance?.chemical_batch_nr !== undefined ? 1 : 0
    } else if (guideline !== 'Non OECD') {
        c1q3 = study.test_method?.test_substance?.chemical_batch_nr !== undefined ? 1 : 0
    }


    let c1q4 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 422'].includes(guideline)) {
        c1q4 = 1
    } else if (['OECD 412', 'OECD 413'].includes(guideline)) {
        c1q4 = 0 //TODO cannot find any data
    }
    // c1q4 = 1

    const c1result = c1q1 + c1q2 + c1q3 + c1q4


    let c2q1 = undefined
    if (guideline === 'OECD 407' || guideline === 'OECD 408') {
        c2q1 = study.test_method?.test_condition?.test_animal?.rodent_speciesstrain !== undefined ? 1 : 0;
    } else if (['OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413'].includes(guideline)) {
        c2q1 = study.test_method?.test_condition?.test_animal?.speciesstrain !== undefined ? 1 : 0//TODO cannot find any data
    } else if (guideline === 'OECD 422') {
        c2q1 = study.test_method?.test_condition?.test_animal?.rat_strain !== undefined ? 1 : 0
    }




    let c2q2 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c2q2 = study.test_method?.test_condition?.test_animal?.sex !== undefined ? 1 : 0;
    }

    let c2q3 = undefined
    if (['OECD 407', 'OECD 408'].includes(guideline)) {
        c2q3 = study.test_method?.test_condition?.test_animal?.rodent_speciesstrain?.split('/')[1] ? 1 : 0
    }
    else if (['OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413'].includes(guideline)) {
        c2q3 = study.test_method?.test_condition?.test_animal?.speciesstrain?.split('/')[1] ? 1 : 0

    } else if (['OECD 422'].includes(guideline)) {

        const tmp0 = study.test_method?.test_condition?.test_animal?.rat_strain?.split('/')[1]
        const tmp1 = study.test_method?.test_condition?.test_animal?.other_species_strain?.split('/')[1]

        c2q3 = tmp0 || tmp1 ? 1 : 0
    }

    let c2q4 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c2q4 = study.test_method?.test_animals?.age_age_value_at_start_of_experiment !== undefined || study.test_method_test_condition_test_animal_weight !== undefined ? 1 : 0 //TODO cannot find any data
    }

    let c2q5 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c2q5 = study.test_method?.test_condition?.test_animal?.housing_and_feeding !== undefined ? 1 : 0
    }

    const c2result = c2q1 + c2q2 + c2q3 + c2q4 + c2q5


    let c3q1 = undefined
    if (guideline !== 'Non OECD') {
        c3q1 = 1 //TODO study var is missing
    }

    let c3q2 = undefined
    if (['OECD 407', 'OECD 422'].includes(guideline)) {
        c3q2 = study.test_method?.test_condition?.nominal_dose_levels !== undefined || study.test_method_test_condition_actual_dose_levels !== undefined ? 1 : 0
    } else if (guideline === 'OECD 408') {
        c3q2 = study.test_method?.test_condition?.nominal_dose_levels !== undefined ? 1 : 0
    } else if (['OECD 409', 'OECD 410', 'OECD 411'].includes(guideline)) {
        c3q2 = study.test_method?.test_condition?.dose_levels !== undefined ? 1 : 0
    } else if (guideline === 'OECD 412' || guideline === 'OECD 413') {
        c3q2 = study.test_method?.test_condition?.nominal_concentrations !== undefined || study.test_method_test_condition_analytical_concentrations !== undefined ? 1 : 0
    }

    let c3q3 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409'].includes(guideline)) {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.duration_of_exposure !== undefined ? 1 : 0
    } else if (['OECD 410'].includes(guideline)) {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.dermal_exposure_period !== undefined ? 1 : 0
    } else if (['OECD 411'].includes(guideline)) {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.dermal_exposure_duration_of_exposure ? 1 : 0
    } else if (guideline === 'OECD 412') {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.duration_of_exposure !== undefined ? 1 : 0
    } else if (['OECD 413'].includes(guideline)) {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.exposure_period_day !== undefined ? 1 : 0
    } else if (['OECD 422'].includes(guideline)) {
        c3q3 = study.test_method?.test_condition?.repeated_administration_scheme !== undefined && study.test_method?.test_condition?.duration_of_exposure_males && study.test_method?.test_condition?.duration_of_exposure_females !== undefined ? 1 : 0
    }

    //TODO if it starts with a zero then the control group is 1 otherwise 0
    let c3q4 = undefined
    if (['OECD 407'].includes(guideline)) {
        if (study.reliability?.control_group !== undefined) {
            c3q4 = 1
        } else
            c3q4 = study.test_method?.test_condition?.nominal_dose_levels?.startsWith('0') || study.test_method_test_condition_actual_dose_levels?.startsWith('0') ? 1 : 0
    } else if (guideline === 'OECD 408') {
        c3q4 = study.reliability?.control_group?.recovery_group || study.test_method?._testcondition_nominal_dose_levels ? 1 : 0
        if (study.reliability?.control_group?.recovery_group !== undefined) {
            c3q4 = 1
        } else c3q4 = study.test_method?.test_condition?.nominal_dose_levels?.startsWith('0') ? 1 : 0

    } else if (guideline === 'OECD 409') {
        if (study.reliability?.control_group !== undefined) {
            c3q4 = 1
        } else {
            c3q4 = study.test_method?.test_condition?.dose_levels?.startsWith('0') ? 1 : 0
        }
    } else if (guideline === 'OECD 410') {
        if (study.reliability?.control_group?.satellite_group !== undefined) {
            c3q4 = 1
        } else c3q4 = study.test_method?.test_condition?.dose_levels?.startsWith('0') ? 1 : 0
    } else if (guideline === 'OECD 411') {
        if (study.reliability?.control_group !== undefined) {
            c3q4 = 1
        }
        else c3q4 = study.test_method?.test_condition?.dose_levels?.startsWith('0') ? 1 : 0
    } else if (['OECD 412', 'OECD 413'].includes(guideline)) {
        if (study.reliability?.control_group !== undefined) {
            c3q4 = 1
        } else c3q4 = study.test_method?.test_condition?.nominal_concentrations?.startsWith('0') || study.test_method?.test_condition?.analytical_concentrations?.startsWith('0') ? 1 : 0

    } else if (guideline === 'OECD 422') {
        if (study.reliability?.control_group !== undefined) {
            c3q4 = 1
        } else c3q4 = study.test_method?.test_condition?.nominal_dose_levels?.startsWith('0') || study.test_method?.test_condition?.actual_dose_levels?.startsWith('0') ? 1 : 0
    }



    let c3q5 = undefined
    //TODO: fix that and remap the data
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c3q5 = study.test_method?.test_condition?.test_animal?.n_animals_group !== undefined || study.test_method?.test_condition?._test_animal?._number_of_satellite_group !== undefined ? 1 : 0
    }

    // if (['OECD 407', 'OECD 408', 'OECD 411', 'OECD 412', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412'].includes(guideline)) {
    //     c3q5 = study.test_method_test_condition_test_animal_n_animals_group !== undefined || study.test_method_test_condition_test_animal_number_of_satellite_group !== undefined ? 1 : 0
    // }

    let c3q6 = undefined
    if (['OECD 407', 'OECD 408'].includes(guideline)) {
        if (study.test_method?.test_condition?.oral_administration?.gavage !== undefined) {
            c3q6 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.dose_volume_mlkg_bw !== undefined ? 1 : 0

        } else c3q6 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined ? 1 : 0
    }
    //tdo: fix that
    if (guideline === 'OECD 409') {
        if (study.test_method?.test_condition?.oral_administration?.gavage !== undefined) {
            c3q6 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.dose_volume_mlkg_bw !== undefined ? 1 : 0
        } else if (study.test_method?.test_condition?.oral_administration?.diet !== undefined) {
            c3q6 = study.test_method?.test_substance?.homogeneity_and_stability !== undefined ? 1 : 0
        } else if (study.test_method?.test_condition?.oral_administration?.drinking_water !== undefined) {
            c3q6 = study.test_method?.test_substance?.homogeneity_and_stability !== undefined ? 1 : 0
        } else c3q6 = 1
    }
    if (['OECD 410', 'OECD 411'].includes(guideline)) {
        c3q6 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.dose_volume_mlkg_bw !== undefined || guideline.test_method?.test_condition?.dermal?.exposure_patching !== undefined ? 1 : 0

    }
    if (['OECD 412', 'OECD 413'].includes(guideline)) {
        c3q6 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_substance?.treatment_prior_to_application !== undefined || study.test_method?.test_condition?.inhalation_exposure_inhalation_chamber?.nose_only_whole_body !== undefined ? 1 : 0
    }
    //tdo: fix that
    if (guideline === 'OECD 422') {
        //one part is missing oral
        if (study.test_method?.test_condition?.route_of_exposure?.oral !== undefined) {
            c3q6 = study.test_method?.test_substance?.homogeneity_and_stability !== undefined || study.test_method_test_condition_dose_volume_ml_kg_bw !== undefined ? 1 : 0
        } else if (study.test_method?.test_condition?.route_of_exposure?.dermal !== undefined) {
            c3q6 = study.test_method?.test_condition?.route_of_exposure?.dermal?.patching_technique ? 1 : 0
        }
        else if (study.test_method?.test_condition?.route_of_exposure?.inhalation !== undefined) {
            c3q6 = study.test_method?.test_substance?.treatment?.prior_to_application !== undefined || study.test_method?.test_substance?.homogeneity_and_stability !== undefined || study.test_method_test_condition_dose_volume_ml_kg_bw !== undefined ? 1 : 0
        } else c3q6 = 1
    }

    let c3q7 = undefined
    if (['OECD 407', 'OECD 409', 'OECD 410', 'OECD 411',].includes(guideline)) {
        c3q7 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined ? 1 : 0
    }
    if (guideline === 'OECD 408') {
        c3q7 = study.test_method?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.actual_dose_levels !== undefined ? 1 : 0
    }
    if (['OECD 412', 'OECD 413'].includes(guideline)) {
        c3q7 = study.test_method?.test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.analytical_concentrations !== undefined ? 1 : 0
    }
    if (guideline === 'OECD 422') {
        c3q7 = study.test_method_test_condition?.test_substance?.homogeneity_and_stability !== undefined || study.test_method?.test_condition?.actual_dose_levels !== undefined ? 1 : 0
    }

    let c4q1 = undefined
    let c4q2 = undefined
    let c4q3 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c4q1 = 1
        c4q2 = 1
        c4q3 = 1
    }


    const c3result = c3q1 + c3q2 + c3q3 + c3q4 + c3q5 + c3q6 + c3q7

    const c4result = c4q1 + c4q2 + c4q3


    let c5q1 = undefined
    let c5q2 = undefined
    if (['OECD 407', 'OECD 408', 'OECD 409', 'OECD 410', 'OECD 411', 'OECD 412', 'OECD 413', 'OECD 422'].includes(guideline)) {
        c5q1 = 1
        c5q2 = 1
    }

    const c5result = c5q1 + c5q2

    const sum = c1result + c2result + c3result + c4result + c5result;

    //TODO: fix that
    const score = sum >= 18 ? 1 : sum >= 13 ? 2 : sum < 13 ? 3 : 0
    const isAllOne = c1q1 === 1 && c2q1 === 1 && c3q1 === 1 && c3q2 === 1 && c3q3 === 1 && c3q4 === 1 && c3q5 === 1 && c5q1 === 1
    const revised_category = isAllOne ? sum >= 18 ? 1 : 2 : 3

    return {
        criteria_1: { question_1: c1q1, question_2: c1q2, question_3: c1q3, question_4: c1q4, sum: c1result },
        criteria_2: { question_1: c2q1, question_2: c2q2, question_3: c2q3, question_4: c2q4, question_5: c2q5, sum: c2result },
        criteria_3: { question_1: c3q1, question_2: c3q2, question_3: c3q3, question_4: c3q4, question_5: c3q5, question_6: c3q6, question_7: c3q7, sum: c3result },
        criteria_4: { question_1: c4q1, question_2: c4q2, question_3: c4q3, sum: c4result },
        criteria_5: { question_1: c5q1, question_2: c5q2, sum: c5result },
        sum,
        initial_category: score,
        revised_category
    }
}