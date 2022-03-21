<template>
  <div>This should automatically call BeaconWallet when mounted</div>
</template>

<script>
import { defineComponent } from "vue"
import { BeaconWallet } from "@taquito/beacon-wallet"

export default defineComponent({
  name: "TezosApp",
  setup() {
    const wallet = new BeaconWallet({
      name: "TezosApp",
      preferredNetwork: "hangzhounet",
    })
  },
})
</script>
