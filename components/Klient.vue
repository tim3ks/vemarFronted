<script setup>
const { companyNip, pomiar, klient, isCompany, postalCode, isExist } =
    storeToRefs(useStore());
const { checkCompany, getPostal, klientAdres } = useStore();

defineProps({
    contentClass: { type: String },
    pomiar: { type: Object },
});

// const postal = String(val2).replace(/-/g, "")

watch(
    () => isCompany.value,
    (val) => {}
);

watch(
    [isCompany, companyNip],
    ([newValue1, newValue2], [oldValue1, oldValue2]) => {
        const nip = String(newValue2);

        // const spliced = newValue2.split("")

        // console.log(spliced);

        if (newValue1 === "Firma" && nip.length === 10)
            checkCompany(companyNip.value);
        //   console.log('Nowa wartość value1:', newValue1);
        //   console.log('Nowa wartość value2:', newValue2);
    }
);

watch(
    () => postalCode.value,
    (val) => {
        // const postl = String(val).replace(/-/g, "")
        let postal = String(val);
        if (postal.length > 2 && postal.length == 5) {
            let newPostal = postal.slice(0, 2) + "-" + postal.slice(2);
            getPostal(newPostal);
        }
        // console.log(postal);

        // if (nip.length === 5) console.log('postal code');
    }
);

// watch(
// 	() => companyNip.value,
// 	(val) => {
// 		const nip = String(val)
// 		if (nip.length === 10) getCompany(companyNip.value)
// 	}
// )

function mask() {
    console.log("mask");
}

// const maskTel = (e) => {

// 	console.log(e);

let val = klient.value.telefon;

var date = val;
if (date.match(/^\d{4}$/) !== null) {
    val = date + "-";
} else if (date.match(/^\d{4}\-\d{2}$/) !== null) {
    val = date + "-";
}

const adres = computed(() => {
    return klientAdres();
});
</script>

<template>
    <div :class="contentClass">
        <!-- {{ pomiar.klient }} -->

        <Firma v-if="isCompany === 'Firma'" />

        <div v-else>
            <input type="text" model="postalCode" />
            Prywatnie
        </div>
    </div>
</template>
