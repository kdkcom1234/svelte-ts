<script lang="ts">
  import Router from "svelte-spa-router";

  import routes from "./routes";
  import { profileStore, type IProfile } from "./stores";

  let profile: IProfile;
  profileStore.subscribe((value) => {
    profile = value;
  });

  // react: useEffect(()={},[profile])
  // vue: watchEffect(()=>{ ...profile})
  $: {
    console.log(profile);
  }
</script>

<header>
  <div>
    <span>{profile.name}</span>
    <span>{profile.email}</span>
  </div>
  <nav>
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/counter">Counter</a></li>
      <li><a href="#/profile">Profile</a></li>
      <li><a href="#/todo">Todo</a></li>
      <li><a href="#/draggable">Draggable</a></li>
    </ul>
  </nav>
</header>
<main>
  <Router {routes} />
</main>

<style>
  nav ul {
    display: flex;
    gap: 2rem;
  }
</style>
