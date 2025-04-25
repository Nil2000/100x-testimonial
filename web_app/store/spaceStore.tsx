import { CollectionType } from "@/lib/db";
import { create } from "zustand";

interface Question {
  id: string;
  title: string;
  maxLength: number;
}

type SpaceInfo = {
  id: string;
  collectStar: boolean;
  collectionType: CollectionType;
  headerTitle: string;
  headerSubtitle: string;
  logo: string;
  name: string;
  questions: Question[];
  isPublished?: boolean;
  thanksSpace: {
    id: string;
    title: string;
    message: string;
  };
  isAnalysisEnabled?: boolean;
};

interface SpaceStore {
  spaceInfo: SpaceInfo;
  setSpaceInfo: (info: SpaceInfo) => void;
  updateSpaceField: (field: any, value: any) => void;
  updateThanksField: (field: any, value: any) => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  spaceInfo: {
    id: "",
    collectStar: false,
    collectionType: CollectionType.TEXT,
    headerTitle: "",
    headerSubtitle: "",
    logo: "",
    name: "",
    questions: [],
    isPublished: false,
    isAnalysisEnabled: false,
    thanksSpace: {
      id: "",
      title: "",
      message: "",
    },
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  setSpaceInfo: (info: any) =>
    set({
      spaceInfo: {
        ...info,
        questions: info.questions.map((q: any, index: number) => ({
          id: q.id || index.toString(),
          title: q.title,
          maxLength: 50,
        })),
        thanksSpace: {
          id: info.thankyouSpace.id,
          title: info.thankyouSpace.title,
          message: info.thankyouSpace.message,
        },
      },
    }),
  updateSpaceField: (field: any, value: any) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        [field]: value,
      },
    })),
  updateThanksField: (field: any, value: any) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        thanksSpace: {
          ...state.spaceInfo.thanksSpace,
          [field]: value,
        },
      },
    })),
}));
