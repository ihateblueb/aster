<script ✂prettier:content✂="CglpbXBvcnQgVmlzaWJpbGl0eSBmcm9tICckbGliL2NvbXBvbmVudHMvVmlzaWJpbGl0eS5zdmVsdGUnOwoJaW1wb3J0IEF2YXRhciBmcm9tICckbGliL2NvbXBvbmVudHMvQXZhdGFyLnN2ZWx0ZSc7CglpbXBvcnQgVGltZSBmcm9tICckbGliL2NvbXBvbmVudHMvVGltZS5zdmVsdGUnOwoJaW1wb3J0IE1mbSBmcm9tICckbGliL2NvbXBvbmVudHMvTWZtLnN2ZWx0ZSc7CglpbXBvcnQgeyBJY29uUmVwZWF0IH0gZnJvbSAnQHRhYmxlci9pY29ucy1zdmVsdGUnOwoKCWV4cG9ydCBsZXQgbm90ZTsK">{}</script>

<div class="noteSimple">
	<div class="header">
		<div class="left">
			<Avatar user={note.user} size="25px" small />
			<span>
				<a
					href={'/@' +
						note.user.username +
						(note.user.local ? '' : '@' + note.user.host)}
				>
					{note.user.displayName
						? note.user.displayName
						: note.user.username}
				</a>
				<a
					class="handle"
					href={'/@' +
						note.user.username +
						(note.user.local ? '' : '@' + note.user.host)}
				>
					@{note.user.username}
					{#if !note.user.local}
						<span class="host">@{note.user.host}</span>
					{/if}
				</a>
			</span>
		</div>
		<div class="right">
			<Time time={note.createdAt} />
			<Visibility visibility={note.visibility} />
		</div>
	</div>
	<p>
		<Mfm content={note.content} simple />
	</p>
</div>

<style lang="scss" ✂prettier:content✂="Cgkubm90ZVNpbXBsZSB7CgkJcGFkZGluZzogMTBweDsKCQlib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iZzMpOwoJCWJvcmRlci1yYWRpdXM6IHZhcigtLWJyLW1kKTsKCQltYXJnaW4tYm90dG9tOiAxMHB4OwoKCQl0cmFuc2l0aW9uOiAwLjFzOwoKCQkmOmhvdmVyIHsKCQkJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmczLTUwKTsKCQl9CgoJCS5oZWFkZXIgewoJCQlkaXNwbGF5OiBmbGV4OwoJCQlhbGlnbi1pdGVtczogY2VudGVyOwoKCQkJZ2FwOiAxMHB4OwoJCQltYXJnaW4tYm90dG9tOiA1cHg7CgoJCQkubGVmdCB7CgkJCQlkaXNwbGF5OiBmbGV4OwoJCQkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQkJCWdhcDogMTBweDsKCQkJCWZsZXgtZ3JvdzogMTsKCgkJCQlhIHsKCQkJCQlmb250LXdlaWdodDogNjAwOwoJCQkJCWNvbG9yOiB2YXIoLS10eDIpOwoJCQkJCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCQkJCX0KCgkJCQkuaGFuZGxlIHsKCQkJCQlmb250LXdlaWdodDogNDAwOwoJCQkJCWNvbG9yOiB2YXIoLS10eDMpOwoJCQkJfQoJCQl9CgoJCQkucmlnaHQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDVweDsKCQkJCWZvbnQtc2l6ZTogdmFyKC0tZnMtc20pOwoJCQl9CgkJfQoJfQo="></style>
