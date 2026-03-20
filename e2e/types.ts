export interface Job {
  jobId: string;
  staticUrl: string;
  url: string;
  title: string;
  company: string;
  tagsAndSkills: string[];
  location: string;
}

export interface UserInfo {
  skills: string[];
  experience: string;
  location: string;
}

export interface ApplicationContext {
  page: any;
  request: any;
  userInfo: UserInfo;
}
