import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export let userType: Writable<number>;
let storedType = browser ? parseInt(localStorage.getItem("userType")!) : -1;
if (Number.isNaN(storedType)) {
    storedType = -1;
}

userType = writable(storedType);
userType.subscribe((value) => {
    if (browser) { localStorage.setItem('userType', value!.toString()); }
});
