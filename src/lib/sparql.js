import { ACUTE_TOXICITY, MUTAGENICITY, REPEATED_DOSE_TOXICITY, CHEMICAL_IDENTITY, SKIN_SENSITISATION_UNMERGED, CARCINOGENICIY } from "./endpoint_constants"
import transformObject from "./transformObject";
import { groups } from "./group";
import uniqBy from "./uniqBy";
import { getDefaultValues } from "./defaultValues";
import extractDeepVars from "./extractDeepVars";
import get from "lodash.get";
import set from "lodash.set";
import klimischScore from "./klimischScore";



const previewChemicalIdentityQuery =
	` 
			PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX ont: <http://ontologies.vub.be/oecd#>

			SELECT DISTINCT *
			{
				?compound rdfs:label ?label .
			}
	`



const chemicalIdentityQuery = ({ smiles, cas, inci, label }) => {
	const smilesStr = smiles !== null
		? `?compound ont:SMILES "${smiles}" .`
		: 'OPTIONAL { ?compound ont:SMILES ?smiles . }';

	const casStr = cas !== null
		? `?compound ont:CAS_number "${cas}" .`
		: 'OPTIONAL { ?compound ont:CAS_number ?cas_number . }';

	// console.log('smilesStr', smilesStr);

	const inciStr = inci ? `filter contains(?label,"${inci}") .` : 'OPTIONAL { ?compound ont:INCI ?inci . }';

	const ret = ` 
			PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX ont: <http://ontologies.vub.be/oecd#>

			SELECT DISTINCT *
			WHERE {

				?compound a ont:Compound .
				?compound rdfs:label ?label .
				${smilesStr}
				${casStr}
				${inciStr}
				?compound ?pred ?value
			} 
	`;

	console.log('ret', ret);

	return ret;
};
// rdfs:label                  "hc yellow n°9 Test (96)" ;
// ont:additional_info         "test substance: hc yellow n°9" ;
// ont:additional_information  "positive control: hca at the concentration of 25% in dmso. local lymph node assay (llna), during the induction phase, the test item, vehicle or reference item was applied over the ears (25 μL per ear) for 3 consecutive days (days 1, 2 and 3). after 2 days of resting, the proliferation of lymphocytes in the lymph node draining the application site was measured by incorporation of tritiated methyl thymidine (day 6). the obtained values were used to calculate stimulation indices (SI). the irritant potential of the test item was assessed in parallel by measurement of ear thickness on days 1, 2, 3 and 6" ;
// ont:administration_scheme   "during the induction phase, the test item, vehicle or reference item was applied over the ears (25 μL per ear) for 3 consecutive days (days 1, 2 and 3). after 2 days of resting, the proliferation of lymphocytes in the lymph node draining the application site was measured by incorporation of tritiated methyl thymidine (day 6). the obtained values were used to calculate stimulation indices (SI). the irritant potential of the test item was assessed in parallel by measurement of ear thickness on days 1, 2, 3 and 6. α-hexylcinnamaldehyde (HCA) at the concentration of 25% in DMSO has been used as positive control." ;
// ont:chemical_batch_nr       "510071" ;
// ont:compound                <http://toxin.vub.be/resource/compound/hc%20yellow%20n°9> ;
// ont:dose_levels             "0.05, 0.1, 0.25, 0.5 and 1% in dmso" ;
// ont:glp                     "yes" ;
// ont:n_animals_group         "4" ;
// ont:observations_and_recording_of_toxicity
// 		"the stimulation index was lower than 3 at all the five concentrations assayed. no dose related effect was observed. hc yellow n° 9 at concentrations up to 1% did not induce delayed contact hypersensitivity in the murine local lymph node assay. no cutaneous reactions and no noteworthy increase in ear thickness were observed in the animals of the treated groups." ;
// ont:oecd_test_nr            "OECD 429" ;
// ont:purity                  "98.5" ;
// ont:ref_in_dossier          "4 (subm. 3)" ;
// ont:sccs_comment_to_test    "the concentrations tested were too low. a sensitisation potential cannot be excluded." ;
// ont:sex                     "f" ;
// ont:species_strain          "mouse/cba/j" ;
// ont:stimulation_index       "at 0.05%: SI 1.15/ at 0.1% : SI 1.20/ at 0.25%: SI 1.12/ at 0.5%: SI 1.73/ at 1%: SI 1.12/ postive control: SI 16.02" ;
// ont:vehicle                 "dmso" ;
// ont:year                    "2005" .

// const sparqlGetSynonyms = (label) => `
// 		PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
// 		SELECT DISTINCT * WHERE {
// 			?filterURI skos:prefLabel ${label} .
// 			GRAPH ?guidelineURI  { ?filterURI skos:altLabel ?variable }
// 		}
// `

const sparqlQuery = () => ` 
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
	PREFIX ont: <http://ontologies.vub.be/oecd#>

	SELECT DISTINCT *
	WHERE {
		?test a ont:Test .
		?test ont:compound ?compound .
		?compound rdfs:label ?compoundLabel .
		?test ont:guidelineLabel ?guidelineLabel .
		?test ?pred ?value.
	}
`

// ${filters.filter(Boolean).reduce(acc, d)=> `${acc}`}

export const getSparqlQueryString = ({ endpoint, smiles = null, cas = null, inci = null, filters = [] }) => {
	if (endpoint === CHEMICAL_IDENTITY)
		return chemicalIdentityQuery({ smiles, cas, inci })

	return sparqlQuery()

}

export const endpointMaker = (n) => `https://wise.vub.ac.be/fuseki/${n}/sparql`;
// export const endpointMaker = (n) => `http://localhost:3030/${n}/sparql`;
export const constructQuery = ({ endpoint, cas = null, inci = null, smiles = null, filters }) => {




	// console.log('endpoint fetch', endpoint);

	// console.log(`${endpointMaker(endpoint)}?query=${encodeURIComponent(getSparqlQueryString({ endpoint, cas, inci, smiles }))}&format=json`)

	return fetch(`${endpointMaker(endpoint)}?query=${encodeURIComponent(getSparqlQueryString({ endpoint, cas, inci, smiles }))}&format=json`)
		.then((res) => res.json()).then((data) => {
			console.log('ret data', data);
			return data;

		})
}


export const constructChemicalIdentitPreviewyQuery = () => {

	return fetch(`${endpointMaker(CHEMICAL_IDENTITY)}?query=${encodeURIComponent((previewChemicalIdentityQuery))}&format=json`)
		.then((res) => res.json())
}



export const transformBindings = (bindings, endpoint = null) => {
	const preData = bindings.map(transformObject);
	const preresults = groups(preData, (d) => d.test)
		.map(([key, values]) => ({ key, values }))
		.map((d) => {
			const obj = {};
			d.values.forEach((e) => {
				const attr = e.pred.substring(e.pred.lastIndexOf('#') + 1);
				obj[attr] = e.value;
			});
			obj.id = d.key;
			obj.endpoint = endpoint;
			// obj.test = d.key;
			// d.key = undefined;
			d.values = undefined;
			// if (obj.guidelineLabel === 'OECD 402') console.log('obj', obj);
			return obj;
		});
	// console.log('preresults', preresults);

	const finalData = preresults
		.map((d) => {
			const defaultValues = getDefaultValues(d.guidelineLabel);

			const deepVars = extractDeepVars(d);
			const defaultLongKeys = Object.keys(defaultValues).filter((k) => {
				// console.log('get', d, k, get(d, k));
				return !get(deepVars, k);
			});

			const defaultKeys = defaultLongKeys.map((d) => d.split('.').slice(-1)[0]);

			// console.log('defaultKeys', defaultKeys);

			defaultLongKeys.forEach((k) => {
				// console.log('set', k, get(defaultValues, k));
				set(deepVars, k, get(defaultValues, k));
			});

			return { ...deepVars, defaultKeys, defaultValues };
		})
		.map((d) => ({
			...d,
			klimisch_score: klimischScore(d)
		}));

	return { finalData, preData, preresults }
};
