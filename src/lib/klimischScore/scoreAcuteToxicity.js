export default function klimischScoreAcutToxicity(study) {

    const c1q1 = 1
    const c1q2 = study.test_method?.test_substance?.purity !== undefined ? 1 : 0
    const c1q3 = study.test_method?.test_substance?.chemical_batch_nr !== undefined ? 1 : 0

    let c1q4 = 1

    if (study.guideline === 'OECD 403') {
        if (study.test_method?.test_substance?.particle_size !== undefined || study.test_method?.test_condition?.equipment?.measuring_particle_size_and_concentration !== undefined) {
            c1q4 = 1
        } else {
            c1q4 = 0
        }

    }

    const c1result = c1q1 + c1q2 + c1q3 + c1q4

    let c2q1;
    if (study.guideline === 'OECD 420') {
        c2q1 = study.test_method?.test_animals?.species?.rat_strain !== undefined || study.test_method?.test_animals?.species?.other_strain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 425') {
        c2q1 = study.test_method?.test_animals?.species?.rodent_strain !== undefined ? 1 : 0

    }
    if (study.guideline === 'non OECD') {
        // c2q1 = study.test_method_test_animal_speciesstrain !== undefined ? 1 : 0
        c2q1 = undefined
    }
    if (study.guideline === 'OECD 403') {
        c2q1 = study.test_method?.test_animals?.species?.strain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 423') {
        c2q1 = study.test_method?.test_animals?.species?.rodent_strain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 402') {
        c2q1 = study.test_method?.test_animals?.species?.rodent_strain !== undefined || study.test_method?.test_animals?.species?.non_rodent_strain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 401') {
        c2q1 = study.test_method?.test_animals?.species?.rodent_strain !== undefined || study.test_method?.test_animals?.species?.non_rodent_strain !== undefined ? 1 : 0
    }

    //TODO VAR
    const c2q2 = study.test_method?.test_animals?.sex !== undefined ? 1 : 0

    let c2q3
    if (study.guideline === 'OECD 420') {
        const rodentPart = study.test_method?.test_animals?.species?.rat_strain?.split('/')[1]
        const nonrodentPart = study.test_method?.test_animals?.species?.other_strain?.split('/')[1]
        c2q3 = rodentPart !== undefined || nonrodentPart !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 425') {
        const rodentPart = study.test_method?.test_animals?.species?.rodent_strain?.split('/')[1]
        c2q3 = rodentPart !== undefined ? 1 : 0
    }
    if (study.guideline === 'non OECD') {
        // const speciesStrain = study.test_method_test_animal_speciesstrain?.split('/')[1]
        c2q3 = undefined//speciesStrain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 403') {
        const speciesStrain = study.test_method?.test_animals?.species?.strain?.split('/')[1]
        c2q3 = speciesStrain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 423') {
        const rodentStrain = study.test_method?.test_animals?.species?.rodent_strain?.split('/')[1]
        c2q3 = rodentStrain !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 402') {
        const rodentPart = study.test_method?.test_animals?.species?.rodent_strain?.split('/')[1]
        //TODO verify that
        const nonrodentPart = study.test_method?.test_animals?.species?.non_rodent_strain?.split('/')[1]
        c2q3 = rodentPart !== undefined || nonrodentPart !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 401') {
        const rodentPart = study.test_method?.test_animals?.species?.rodent_strain?.split('/')[1]
        //TODO verify that
        const nonrodentPart = study.test_method?.test_animals?.species?.non_rodent_strain?.split('/')[1]

        c2q3 = rodentPart !== undefined || nonrodentPart !== undefined ? 1 : 0
    }


    let c2q4 = undefined

    if (study.guideline === 'OECD 401' || study.guideline === 'OECD 402' || study.guideline === 'OECD 403') {
        c2q4 = study.test_method?.test_animals?.age_age_value_at_start_of_experiment !== undefined || study.test_method_test_animals_weight_male_mean_weight_value !== undefined || study.test_method_test_animals_weight_female_mean_weight_value !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 420') {
        c2q4 = study.test_method?.test_animals?.age_age_value_at_start_of_experiment !== undefined || study.test_method_test_animals_weight_mean_weight_unit !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 423') {
        c2q4 = study.test_method?.test_animals?.weight_value !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 425') {
        c2q4 = study.test_method?.test_animals?.age !== undefined || study.test_method?.test_animals?.weight_value !== undefined ? 1 : 0
    }

    const c2q5 = 1

    const c2result = c2q1 + c2q2 + c2q3 + c2q4 + c2q5


    // if it's not OECD, then it's different otherwise it's 1
    const c3q1 = study.guideline === 'non OECD' ? undefined : 1

    let c3q2 = undefined
    if (study.guideline === 'OECD 401' || study.guideline === 'OECD 402' || study.guideline === 'OECD 420') {
        c3q2 = study.test_method?.test_condition?.dose_levels_value !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 423' || study.guideline === 'OECD 425') {
        c3q2 = study.test_method?.test_condition?.starting_dose_levels_value !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 403') {
        c3q2 = study.test_method?.test_condition?.nominal_dose_levels_value !== undefined || study.test_method?.test_condition?.actual_dose_levels_value !== undefined ? 1 : 0
    }
    if (study.guideline === 'non OECD') {
        c3q2 = undefined
    }

    const c3q3 = study.guideline !== 'non OECD' ? 1 : undefined

    const c3q4 = study.guideline !== 'non OECD' ? 1 : undefined

    let c3q5 = undefined
    if (study.guideline === 'OECD 401' || study.guideline === 'OECD 402' || study.guideline === 'OECD 423' || study.guideline === 'OECD 420') {
        c3q5 = study.test_method?.test_animals?.n_animals__group !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 403' || study.guideline === 'OECD 425') {
        c3q5 = study.test_method?.test_animals?.n_animals !== undefined ? 1 : 0
    }
    if (study.guideline === 'non OECD') {
        c3q5 = undefined
    }

    let c3q6 = undefined
    if (study.guideline === 'OECD 401' || study.guideline === 'OECD 423' || study.guideline === 'OECD 425' || study.guideline === 'OECD 420') {
        c3q6 = study.test_method?.test_condition?.dose_volume !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 402') {
        c3q6 = study.test_method?.test_condition?.dermal_exposure_patching_technique !== undefined ? 1 : 0
    }
    if (study.guideline === 'OECD 403') {
        c3q6 = study.test_method?.test_substance?.treatment_prior_to_use !== undefined ? 1 : 0
    }
    if (study.guideline === 'non OECD') {
        c3q6 = undefined
    }

    let c3q7 = 0
    if (study.guideline === 'OECD 401' || study.guideline === 'OECD 402' || study.guideline === 'OECD 423' || study.guideline === 'OECD 425' || study.guideline === 'OECD 420') {
        c3q7 = 1
    }
    if (study.guideline === 'OECD 403') {
        c3q7 = study.test_method?.test_condition?.equipment?.measuring_particle_size_and_concentration !== undefined || study.test_method?.test_substance?.particle_size !== undefined ? 1 : 0
    }

    const c3result = c3q1 + c3q2 + c3q3 + c3q4 + c3q5 + c3q6 + c3q7


    const c4q1 = study.guideline !== 'non OECD' ? 1 : undefined

    const c4q2 = study.guideline !== 'non OECD' ? 1 : undefined

    const c4q3 = study.guideline !== 'non OECD' ? 1 : undefined

    const c4result = c4q1 + c4q2 + c4q3


    const c5q1 = study.guideline !== 'non OECD' ? 1 : undefined

    const c5q2 = study.guideline !== 'non OECD' ? 1 : undefined


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
