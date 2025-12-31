import { getVideoTranscription } from "./ai/getVideoTranscription";

async function main() {
  try {
    const resp = await getVideoTranscription(
      "https://stream.mux.com/V00lHajD02rmT2bExmWF9o901sPnyCL63vL1ux00XJGooIs/low.mp4"
    );
    console.log("Transcription:", resp);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
// https://youtu.be/8LSt8_11wbQ?si=QsvMs0dCxhIKyGgN
// http://localhost:9000/100xtestimonials/public/space/nilabhra_space/feedbackVideo/fra3qzgtbrbzzk10qpfufzfzb4b43f3193td9wb8p24mvrya.mp4
// https://stream.mux.com/V00lHajD02rmT2bExmWF9o901sPnyCL63vL1ux00XJGooIs/low.mp4
