export const ROUTES_PATH = {
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  TERM_OF_SERVICE: "/term-of-service",
  CLASSROOMS: "/classrooms",
  QUESTIONS: "/questions",
  ACTIVITIES: "/activities",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  DOCUMENTS: "/documents",
  CALENDAR: "/calendar",
  IMPORT: "/import",
};
export const ROLE_TYPE = {
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
};
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TRUE_FALSE: "TRUE_FALSE",
  MULTIPLE_CORRECT: "MULTIPLE_CORRECT",
  FILL_IN: "FILL_IN",
};

export const ACTIVITY_TYPE = {
  HANGMAN: "HANGMAN",
  FLASH_CARD: "FLASH_CARD",
  MATRIX_WORD: "MATRIX_WORD",
};
export const MAP_ACTIVITY_NAME = {
  HANGMAN: "Đoán từ với Balloon",
  FLASH_CARD: "Thẻ Flashcard",
  MATRIX_WORD: "Crossword",
};

export const MAP_LEVEL_LABEL = {
  EASY: "Dễ",
  MEDIUM: "Trung bình",
  HARD: "Khó",
};

export const ERROR_MESSAGE = {
  USERNAME_IS_REQUIRED: "USERNAME_IS_REQUIRED",
  USERNAME_EXISTED: "USERNAME_EXISTED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  VERIFY_LINK_HAS_EXPRIED: "VERIFY_LINK_HAS_EXPRIED",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  NOT_FOUND: "NOT_FOUND",
  EXISTED: "EXISTED",
  WRONG_PASSWORD_TO_JOIN: "WRONG_PASSWORD_TO_JOIN",
  ALREADY_JOINED_THIS_CLASSROOM: "ALREADY_JOINED_THIS_CLASSROOM",
  USERNAME_EXISTED: "USERNAME_EXISTED",
  OLD_PASSWORD_NOT_CORRECT: "OLD_PASSWORD_NOT_CORRECT",
  ACTIVITY_HAS_BEEN_DELETED: "ACTIVITY_HAS_BEEN_DELETED",
};

export const LIST_AVATAR = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fboy-1.svg?alt=media&token=f6e4e3f3-2a72-40b7-b2b9-3b1a20cedfe8",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fboy.svg?alt=media&token=c1d73536-0b6d-409c-b233-634bae03fe94",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fgirl-1.svg?alt=media&token=f1b2ede0-2ea0-4e50-b193-272209a5433b",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fgirl.svg?alt=media&token=c7a66202-8483-4025-9ca7-b6110e9606d4",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fman-1.svg?alt=media&token=eb0d225b-4ac1-4bef-ab8b-89232b6e404d",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fman-2.svg?alt=media&token=67896057-9e95-4907-a5de-b47ece9e6f30",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fman-3.svg?alt=media&token=fb37509c-98cb-4865-aafd-24165dbfe89d",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fman-4.svg?alt=media&token=c4ee7ab7-5c03-41d4-b287-a1cc5fb38def",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/equiz-83b66.appspot.com/o/avatar_template%2Fman.svg?alt=media&token=b0f084ed-c6f6-4391-a3e6-684ebe4bd487",
  },
];

// export const BASE_URL = "http://localhost:8890";
export const BASE_URL = "https://equiz-backend.herokuapp.com";
