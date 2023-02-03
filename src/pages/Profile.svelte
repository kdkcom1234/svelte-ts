<script lang="ts">
  import { profileStore, type IProfile } from "../stores";

  let profile: IProfile = { name: "", email: "" };

  profileStore.subscribe((value) => {
    profile = value;
  });

  const handleClick = () => {
    profileStore.update((prev) => ({ ...profile }));
  };
</script>

<div>
  <input type="text" placeholder="name" bind:value={profile.name} />
  <input type="text" placeholder="email" bind:value={profile.email} />
  <button on:click={handleClick}>update</button>
</div>
