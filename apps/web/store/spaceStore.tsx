import { CollectionType } from "@repo/db/enums";
import { create } from "zustand";

interface Question {
  id: string;
  title: string;
  maxLength: number;
}

type ThemeOptions = {
  showBrandLogo?: boolean;
  font?: string;
};

type WallOfLoveSettings = {
  style: string;
  styleOptions: {
    columns?: string;
    rows?: string;
    cardVariant?: string;
    showRating?: string;
    showDate?: string;
    gap?: string;
  };
};

type SpaceTheme = {
  theme: string | null;
  themeOptions: ThemeOptions;
  wallOfLove?: WallOfLoveSettings;
};

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
  isSentimentEnabled?: boolean;
  isSpamEnabled?: boolean;
  theme: SpaceTheme;
};

/** API space payload uses Prisma's `thankyouSpace` name. */
type SpaceApiPayload = Omit<SpaceInfo, "thanksSpace" | "questions" | "theme"> & {
  thankyouSpace: SpaceInfo["thanksSpace"];
  questions: Array<{ id?: string; title: string }>;
  theme?: SpaceTheme | null;
};

interface SpaceStore {
  spaceInfo: SpaceInfo;
  setSpaceInfo: (info: SpaceApiPayload) => void;
  updateSpaceField: <K extends keyof SpaceInfo>(
    field: K,
    value: SpaceInfo[K],
  ) => void;
  updateThanksField: <K extends keyof SpaceInfo["thanksSpace"]>(
    field: K,
    value: SpaceInfo["thanksSpace"][K],
  ) => void;
  updateThemeField: <K extends keyof SpaceInfo["theme"]>(
    field: K,
    value: SpaceInfo["theme"][K],
  ) => void;
  updateWallOfLoveSettings: (settings: WallOfLoveSettings) => void;
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
    isSentimentEnabled: false,
    isSpamEnabled: false,
    thanksSpace: {
      id: "",
      title: "",
      message: "",
    },
    theme: {
      theme: null,
      themeOptions: {
        showBrandLogo: true,
      },
    },
  },
  setSpaceInfo: (info) =>
    set({
      spaceInfo: {
        ...info,
        questions: info.questions.map((q, index) => ({
          id: q.id || index.toString(),
          title: q.title,
          maxLength: 50,
        })),
        thanksSpace: {
          id: info.thankyouSpace.id,
          title: info.thankyouSpace.title,
          message: info.thankyouSpace.message,
        },
        theme: info.theme ?? {
          theme: null,
          themeOptions: { showBrandLogo: true },
        },
      },
    }),
  updateSpaceField: (field, value) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        [field]: value,
      },
    })),
  updateThanksField: (field, value) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        thanksSpace: {
          ...state.spaceInfo.thanksSpace,
          [field]: value,
        },
      },
    })),
  updateThemeField: (field, value) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        theme: {
          ...state.spaceInfo.theme,
          [field]: value,
        },
      },
    })),
  updateWallOfLoveSettings: (settings) =>
    set((state) => ({
      spaceInfo: {
        ...state.spaceInfo,
        theme: {
          ...state.spaceInfo.theme,
          wallOfLove: settings,
        },
      },
    })),
}));
