export const gross_necropsy_liver = "gross_necropsyXliver";
export const organ_body_weight = "organ_weight_and_organbody_weight";

export const histopathology = "histopathology"
export const histopathology_liver = "histopathologyXliver"

export const alanine_aminotransferase = "alanine_aminotransferase";
export const blood_and_serum_biomarkers = "blood_and_serum_biomarkers";

export const aspartate_aminotransferase = "aspartate_aminotransferase";

export const other_enzymes_and_biomarker = "other_enzymes_and_biomarker";

export const alkaline_phosphatase = "alkaline_phosphatase";

export const gamma_glutamyl_transpeptidase = "gamma_glutamyl_transpeptidase";

export const clinical_chemistry_other = "clinical_chemistry_other"

export const sorbitol_dehydrogenase = "sorbitol_dehydrogenase";

export const other_enzymes_and_bile_acids = "other_enzymes_and_bile_acids";
export const total_bilirubin = "toaal_bilirubin";

export const total_cholesterol = "total_cholesterol";

export const fasting_triglycerides = "fasting_triglycerides";

export const analyses_lipids = "analyses_lipids";

export const serum_markers_others = "serum_markersXother"

export const total_protein = "total_protein"

export const albumin = "plasma_markersXalbumin"

export const high_density_lipoprotein = "high_density_lipoprotein"
export const low_density_lipoprotein = "low_density_lipoprotein"

const NON_OECD = "non OECD";
const OECD_407 = "OECD 407";
const OECD_412 = "OECD 412";
const OECD_411 = "OECD 411";
const OECD_409 = "OECD 409";
const OECD_408 = "OECD 408";
const OECD_413 = "OECD 413";
const OECD_422 = "OECD 422";
const OECD_410 = "OECD 410";

export default [
    {
        id: gross_necropsy_liver,
        [OECD_407]: [gross_necropsy_liver],
        [NON_OECD]: ["gross_pathology"],
        [OECD_412]: [gross_necropsy_liver, organ_body_weight],
        [OECD_411]: [gross_necropsy_liver, organ_body_weight],
        [OECD_409]: [gross_necropsy_liver, organ_body_weight],
        [OECD_408]: [gross_necropsy_liver, organ_body_weight],
        [OECD_413]: [gross_necropsy_liver, organ_body_weight],
        [OECD_422]: [gross_necropsy_liver, organ_body_weight],
        [OECD_410]: [gross_necropsy_liver, organ_body_weight],
    },
    {
        id: histopathology_liver,
        [OECD_407]: [histopathology],
        [NON_OECD]: [histopathology],
        [OECD_412]: [histopathology_liver], //not found
        [OECD_411]: [histopathology_liver],
        [OECD_409]: [histopathology_liver],
        [OECD_408]: [histopathology_liver],
        [OECD_413]: [histopathology_liver],
        [OECD_422]: [histopathology_liver],
        [OECD_410]: [histopathology_liver]
    },
    {
        id: alanine_aminotransferase,
        [OECD_407]: [alanine_aminotransferase],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [alanine_aminotransferase],
        [OECD_411]: [alanine_aminotransferase],
        [OECD_409]: [alanine_aminotransferase],
        [OECD_408]: [alanine_aminotransferase],
        [OECD_413]: [alanine_aminotransferase],
        [OECD_422]: [alanine_aminotransferase],
        [OECD_410]: [alanine_aminotransferase]
    },
    {
        id: aspartate_aminotransferase,
        [OECD_407]: [aspartate_aminotransferase],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [aspartate_aminotransferase],
        [OECD_411]: [aspartate_aminotransferase],
        [OECD_409]: [aspartate_aminotransferase],
        [OECD_408]: [aspartate_aminotransferase],
        [OECD_413]: [aspartate_aminotransferase],
        [OECD_422]: [aspartate_aminotransferase],
        [OECD_410]: [aspartate_aminotransferase]
    },
    {
        id: alkaline_phosphatase,
        [OECD_407]: ['other_enzymes_and_bile_acids'],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other], // not found in data
        [OECD_411]: [other_enzymes_and_biomarker],
        [OECD_409]: [other_enzymes_and_biomarker],
        [OECD_408]: [alkaline_phosphatase],
        [OECD_413]: [alkaline_phosphatase],
        [OECD_422]: [alkaline_phosphatase],
        [OECD_410]: [other_enzymes_and_biomarker]
    },
    {
        id: gamma_glutamyl_transpeptidase,
        [OECD_407]: gamma_glutamyl_transpeptidase,
        [NON_OECD]: blood_and_serum_biomarkers,
        [OECD_412]: [clinical_chemistry_other], //not found
        [OECD_411]: [gamma_glutamyl_transpeptidase],
        [OECD_409]: [gamma_glutamyl_transpeptidase],
        [OECD_408]: [gamma_glutamyl_transpeptidase],
        [OECD_413]: [gamma_glutamyl_transpeptidase],
        [OECD_422]: [gamma_glutamyl_transpeptidase],
        [OECD_410]: [gamma_glutamyl_transpeptidase]
    },
    {
        id: sorbitol_dehydrogenase,
        [OECD_407]: [sorbitol_dehydrogenase],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other], //not found
        [OECD_411]: [other_enzymes_and_biomarker],
        [OECD_409]: [other_enzymes_and_biomarker],
        [OECD_408]: [sorbitol_dehydrogenase], //not found
        [OECD_413]: [other_enzymes_and_biomarker],
        [OECD_422]: [sorbitol_dehydrogenase], //not found
        [OECD_410]: [other_enzymes_and_biomarker]
    },
    {
        id: "bile acids",
        [OECD_407]: [other_enzymes_and_bile_acids],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other], //not found
        [OECD_411]: [other_enzymes_and_biomarker],
        [OECD_409]: [other_enzymes_and_biomarker],
        [OECD_408]: [other_enzymes_and_biomarker],
        [OECD_413]: [other_enzymes_and_biomarker],
        [OECD_422]: ["bile_acids"], //not found
        [OECD_410]: other_enzymes_and_biomarker
    },
    {
        id: total_bilirubin,
        [OECD_407]: [serum_markers_others], //not sure
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other], //not found
        [OECD_411]: [total_bilirubin],
        [OECD_409]: [total_bilirubin],
        [OECD_408]: [total_bilirubin],
        [OECD_413]: [total_bilirubin],
        [OECD_422]: [other_enzymes_and_biomarker],
        [OECD_410]: [total_bilirubin]
    },
    {
        id: total_cholesterol,
        [OECD_407]: [total_cholesterol],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [total_cholesterol],
        [OECD_411]: [total_cholesterol],
        [OECD_409]: [total_cholesterol],
        [OECD_408]: [total_cholesterol],
        [OECD_413]: [total_cholesterol],
        [OECD_422]: [total_cholesterol],
        [OECD_410]: [other_enzymes_and_biomarker]
    },
    {
        id: fasting_triglycerides,
        [OECD_407]: [fasting_triglycerides],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: ["triglycerides"], //not found
        [OECD_411]: [analyses_lipids],
        [OECD_409]: [analyses_lipids],
        [OECD_408]: [fasting_triglycerides],
        [OECD_413]: ["triglycerides"], //not found
        [OECD_422]: [fasting_triglycerides],
        [OECD_410]: [analyses_lipids]
    },
    {
        id: high_density_lipoprotein,
        [OECD_407]: [serum_markers_others],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other],
        [OECD_411]: [analyses_lipids],
        [OECD_409]: [analyses_lipids],
        [OECD_408]: [high_density_lipoprotein], //not found
        [OECD_413]: ["lipids"], //not found
        [OECD_422]: [serum_markers_others],
        [OECD_410]: [analyses_lipids]
    },
    {
        id: low_density_lipoprotein,
        [OECD_407]: [serum_markers_others],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [clinical_chemistry_other],
        [OECD_411]: [analyses_lipids],
        [OECD_409]: [analyses_lipids],
        [OECD_408]: [low_density_lipoprotein], //not found  
        [OECD_413]: ["lipids"],//not found
        [OECD_422]: [serum_markers_others],
        [OECD_410]: [analyses_lipids]
    },
    {
        id: total_protein,
        [OECD_407]: [total_protein],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [total_protein],
        [OECD_411]: [total_protein],
        [OECD_409]: [total_protein],
        [OECD_408]: [total_protein],
        [OECD_413]: [total_protein],
        [OECD_422]: [total_protein],
        [OECD_410]: [total_protein]
    },
    {
        id: albumin,
        [OECD_407]: [albumin],
        [NON_OECD]: [blood_and_serum_biomarkers],
        [OECD_412]: [albumin],
        [OECD_411]: [albumin],
        [OECD_409]: [albumin],
        [OECD_408]: [albumin],
        [OECD_413]: [albumin],
        [OECD_422]: [albumin],
        [OECD_410]: [albumin]
    }
]