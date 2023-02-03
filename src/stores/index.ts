import { writable } from "svelte/store";

export interface IProfile {
  name:String; 
  email:string
}

export const PROFILE_INIT : IProfile = {name: "", email: ""};
export const profileStore = writable<IProfile>({...PROFILE_INIT});