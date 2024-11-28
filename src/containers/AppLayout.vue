<script setup lang="ts"></script>

<template>
	<Component :is="$route.meta.layoutComponent">
		<slot />
	</Component>
</template>

<style lang="scss" module></style>
