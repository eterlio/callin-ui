<template>
<Wrapper >
    <h1>Some section came here</h1>
    <div class="flex justify-between items-center">
        <IconButton icon="trash" type="faded" size="sm"  shape="rounded" />
        <IconButton icon="trash" type="faded-outline" size="md"  shape="rounded" />
        <IconButton icon="trash" type="outline" size="lg"   shape="rounded"/>
        <IconButton icon="trash" type="bg" size="lg" shape="rounded" />
    </div>
    <div>
        <button class="btn bg-primary">Submit</button>
    </div>
</Wrapper>
</template>

<script lang="ts" setup>
import Wrapper from '../../components/Wrapper.vue';
import IconButton from '../../components/buttons/IconButton.vue';
</script>
