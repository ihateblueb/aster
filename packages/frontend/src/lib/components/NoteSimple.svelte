<script ✂prettier:content✂="CglpbXBvcnQgVmlzaWJpbGl0eSBmcm9tICckbGliL2NvbXBvbmVudHMvVmlzaWJpbGl0eS5zdmVsdGUnOwoJaW1wb3J0IEF2YXRhciBmcm9tICckbGliL2NvbXBvbmVudHMvQXZhdGFyLnN2ZWx0ZSc7CglpbXBvcnQgVGltZSBmcm9tICckbGliL2NvbXBvbmVudHMvVGltZS5zdmVsdGUnOwoJaW1wb3J0IE1mbSBmcm9tICckbGliL2NvbXBvbmVudHMvTWZtLnN2ZWx0ZSc7CglpbXBvcnQgeyBnb3RvIH0gZnJvbSAnJGFwcC9uYXZpZ2F0aW9uJzsKCglleHBvcnQgbGV0IG5vdGU7Cg==">{}</script>

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
		<Mfm
			content={note.content}
			simple
			on:click={() => goto('/notes/' + note.id)}
		/>
	</p>
</div>

<style lang="scss" ✂prettier:content✂="Cgkubm90ZVNpbXBsZSB7CgkJcGFkZGluZzogMTBweDsKCQlib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iZzMpOwoJCWJvcmRlci1yYWRpdXM6IHZhcigtLWJyLW1kKTsKCQltYXJnaW4tYm90dG9tOiAxMHB4OwoJCXRyYW5zaXRpb246IDAuMXM7CgkJJjpob3ZlciB7CgkJCWJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnMy01MCk7CgkJfQoJCS5oZWFkZXIgewoJCQlkaXNwbGF5OiBmbGV4OwoJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQlnYXA6IDEwcHg7CgkJCW1hcmdpbi1ib3R0b206IDVweDsKCQkJLmxlZnQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDEwcHg7CgkJCQlmbGV4LWdyb3c6IDE7CgkJCQlhIHsKCQkJCQlmb250LXdlaWdodDogNjAwOwoJCQkJCWNvbG9yOiB2YXIoLS10eDIpOwoJCQkJCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCQkJCX0KCQkJCS5oYW5kbGUgewoJCQkJCWZvbnQtd2VpZ2h0OiA0MDA7CgkJCQkJY29sb3I6IHZhcigtLXR4Myk7CgkJCQl9CgkJCX0KCQkJLnJpZ2h0IHsKCQkJCWRpc3BsYXk6IGZsZXg7CgkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJZ2FwOiA1cHg7CgkJCQlmb250LXNpemU6IHZhcigtLWZzLXNtKTsKCQkJfQoJCX0KCX0K"></style>
