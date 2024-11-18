<script setup lang="ts">
import AppLayout from '@/containers/AppLayout.vue';
</script>

<template>
	<div>
		<AppLayout>
			<RouterView v-slot="{ Component, route }">
				<component :is="Component" :key="route.fullPath" />
			</RouterView>
		</AppLayout>
	</div>
</template>

<style src="@/assets/scss/global/index.scss" />
<style lang="scss" module></style>
