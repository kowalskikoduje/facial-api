import * as tf from "@tensorflow/tfjs-node";
import * as faceapi from "face-api.js";
import fetch from "node-fetch";
import path from "path";

const __dirname = path.resolve();

const MODELS_URL = path.join(__dirname, "/src/models/face-api");

const maxDescriptorDistance = 0.5;

export async function loadModels() {

  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODELS_URL);
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(MODELS_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL);
}

export async function createMatcher(faceProfile) {
  let labeledDescriptors = faceProfile.map(
    (member) =>
      new faceapi.LabeledFaceDescriptors(
        member.label,
        Object.values(member.descriptors).map((descriptor) => {
          return new Float32Array(Object.values(descriptor));
        })
      )
  );

  return new faceapi.FaceMatcher(labeledDescriptors, maxDescriptorDistance);
}

export function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.tinyFaceDetector.params;
}
