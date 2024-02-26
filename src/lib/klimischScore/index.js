import klimischScoreAcutToxicity from "./scoreAcuteToxicity"
import klimischScoreRepeatedDoseToxicity from "./scoreRepeatedDoseToxicity"
function klimischScore(study) {
    if (study.endpoint === 'acute-toxicity') {
        return klimischScoreAcutToxicity(study)

    } else if (study.endpoint === 'repeated-toxicity') {
        return klimischScoreRepeatedDoseToxicity(study)
    }
}

export default klimischScore;