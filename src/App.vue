<template>
  <div>This should automatically call BeaconWallet when mounted {{ pkh }}</div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ref } from "vue";
export default defineComponent({
  name: "TezosApp",
  setup() {
    const pkh = ref("");
    const wallet = new BeaconWallet({
      name: "TezosApp",
      preferredNetwork: "ithacanet",
    });

    onMounted(async () => {
      await wallet.requestPermissions({
        network: {
          type: "ithacanet",
        },
      });
      pkh.value = await wallet.getPKH();
      console.log("pkh value ", pkh.value);
    });
    return { pkh };
  },
});
</script>
