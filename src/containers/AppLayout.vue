<script setup lang="ts"></script>

<template>
	<div id="appLayout" :class="$style.appLayout">
		<Component :is="$route.meta.layoutComponent">
			<slot />
		</Component>
	</div>
</template>

<style lang="scss" module>
.appLayout {
	width: 100%;
	height: 100%;
}
</style>
