<script ✂prettier:content✂="CglpbXBvcnQgTm90ZUhlYWRlciBmcm9tICckbGliL2NvbXBvbmVudHMvTm90ZUhlYWRlci5zdmVsdGUnOwoJaW1wb3J0IE5vdGVGb290ZXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL05vdGVGb290ZXIuc3ZlbHRlJzsKCWltcG9ydCBNZm0gZnJvbSAnJGxpYi9jb21wb25lbnRzL01mbS5zdmVsdGUnOwoJaW1wb3J0IHsgSWNvblJlcGVhdCB9IGZyb20gJ0B0YWJsZXIvaWNvbnMtc3ZlbHRlJzsKCWltcG9ydCBUaW1lIGZyb20gJyRsaWIvY29tcG9uZW50cy9UaW1lLnN2ZWx0ZSc7CglpbXBvcnQgQXZhdGFyIGZyb20gJyRsaWIvY29tcG9uZW50cy9BdmF0YXIuc3ZlbHRlJzsKCWltcG9ydCBWaXNpYmlsaXR5IGZyb20gJyRsaWIvY29tcG9uZW50cy9WaXNpYmlsaXR5LnN2ZWx0ZSc7CglpbXBvcnQgTm90ZVNpbXBsZSBmcm9tICckbGliL2NvbXBvbmVudHMvTm90ZVNpbXBsZS5zdmVsdGUnOwoJaW1wb3J0IHsgZ290byB9IGZyb20gJyRhcHAvbmF2aWdhdGlvbic7CgoJZXhwb3J0IGxldCBub3RlOwoJZXhwb3J0IGxldCBleHBhbmRlZCA9IGZhbHNlOwoJbGV0IGN3T3BlbiA9IGZhbHNlOwo=">{}</script>

{#snippet renderNote(data, quote)}
	<NoteHeader note={data} />
	<div class="content">
		{#if data.cw}
			{#key cwOpen}
				<div class="cw">
					<span>{data.cw}</span>
					<button on:click={() => (cwOpen = !cwOpen)}
						>{!cwOpen ? 'Show' : 'Hide'}</button
					>
				</div>
				{#if cwOpen}
					<Mfm
						content={data.content}
						on:click={() =>
							!expanded ? goto('/notes/' + data.id) : () => {}}
					/>
				{/if}
			{/key}
		{:else}
			<Mfm
				content={data.content}
				on:click={() =>
					!expanded ? goto('/notes/' + data.id) : () => {}}
			/>
		{/if}
	</div>
	{#if quote}
		<NoteSimple note={data.repeat} />
	{/if}
	<NoteFooter note={data} />
{/snippet}

<article class={expanded ? 'expanded' : ''}>
	{#if note.repeat && !note.content}
		<div class="repeatHeader">
			<div class="left">
				<IconRepeat size="var(--fs-lg)" color="var(--tx2)" />
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
					</a> repeated
				</span>
			</div>
			<div class="right">
				<Time time={note.createdAt} />
				<Visibility visibility={note.visibility} />
			</div>
		</div>
		{@render renderNote(note.repeat)}
	{:else if note.repeat && note.content}
		{@render renderNote(note, true)}
	{:else}
		{@render renderNote(note)}
	{/if}
</article>

<style lang="scss" scoped ✂prettier:content✂="CglhcnRpY2xlIHsKCQlwYWRkaW5nOiAxNnB4OwoJCXRyYW5zaXRpb246IDAuMXM7CgoJCSY6bm90KC5leHBhbmRlZCk6aG92ZXIgewoJCQlib3JkZXItcmFkaXVzOiB2YXIoLS1ici1tZCk7CgkJCWJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnMy0yNSk7CgkJfQoKCQkucmVwZWF0SGVhZGVyIHsKCQkJZGlzcGxheTogZmxleDsKCQkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQkJZ2FwOiAxMHB4OwoJCQltYXJnaW4tYm90dG9tOiAxMHB4OwoKCQkJLmxlZnQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDEwcHg7CgkJCQlmbGV4LWdyb3c6IDE7CgkJCQlhIHsKCQkJCQlmb250LXdlaWdodDogNjAwOwoJCQkJCWNvbG9yOiB2YXIoLS10eDIpOwoJCQkJCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCQkJCX0KCQkJfQoJCQkucmlnaHQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDVweDsKCQkJCWZvbnQtc2l6ZTogdmFyKC0tZnMtc20pOwoJCQl9CgkJfQoKCQkuY29udGVudCB7CgkJCW1hcmdpbjogMTBweCAwOwoKCQkJLmN3IHsKCQkJCWRpc3BsYXk6IGZsZXg7CgkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJd2lkdGg6IDEwMCU7CgkJCQljb2xvcjogdmFyKC0tYWMxKTsKCQkJCWZvbnQtd2VpZ2h0OiA1MDA7CgkJCQliYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hYzEtMjUpOwoJCQkJYm9yZGVyLXJhZGl1czogdmFyKC0tYnItbWQpOwoJCQkJcGFkZGluZzogNnB4IDEwcHg7CgkJCQlib3gtc2hhZG93OiB2YXIoLS1mdW5reS1lZmZlY3QpOwoJCQkJYm94LXNpemluZzogYm9yZGVyLWJveDsKCQkJCW1hcmdpbi1ib3R0b206IDEwcHg7CgoJCQkJYnV0dG9uIHsKCQkJCQlkaXNwbGF5OiBmbGV4OwoJCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQkJYm94LXNpemluZzogYm9yZGVyLWJveDsKCQkJCQlib3JkZXI6IG5vbmU7CgkJCQkJYm9yZGVyLXJhZGl1czogdmFyKC0tYnItbWQpOwoJCQkJCXBhZGRpbmc6IDZweCAxMHB4OwoJCQkJCWZvbnQtZmFtaWx5OiB2YXIoLS1mb250KTsKCQkJCQlmb250LWZlYXR1cmUtc2V0dGluZ3M6IHZhcigtLWZvbnQtZmVhdHVyZXMpOwoJCQkJCWZvbnQtc2l6ZTogdmFyKC0tZnMtbWQpOwoJCQkJCWZvbnQtd2VpZ2h0OiA0MDA7CgkJCQkJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoJCQkJCXRyYW5zaXRpb246CgkJCQkJCTAuMXMsCgkJCQkJCXdpZHRoIDBzLAoJCQkJCQloZWlnaHQgMHMsCgkJCQkJCW91dGxpbmUgMHM7CgkJCQkJY29sb3I6IHZhcigtLXR4MSk7CgkJCQkJYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7CgoJCQkJCSY6aG92ZXIgewoJCQkJCQljb2xvcjogdmFyKC0tdHgxKTsKCQkJCQkJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWMxLTI1KTsKCQkJCQkJYm94LXNoYWRvdzogdmFyKC0tZnVua3ktZWZmZWN0KTsKCQkJCQl9CgkJCQl9CgoJCQkJc3BhbiB7CgkJCQkJZmxleC1ncm93OiAxOwoJCQkJfQoJCQl9CgkJfQoJfQo="></style>
