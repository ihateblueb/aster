<script ✂prettier:content✂="CglpbXBvcnQgTm90ZUhlYWRlciBmcm9tICckbGliL2NvbXBvbmVudHMvTm90ZUhlYWRlci5zdmVsdGUnOwoJaW1wb3J0IE5vdGVGb290ZXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL05vdGVGb290ZXIuc3ZlbHRlJzsKCWltcG9ydCBNZm0gZnJvbSAnJGxpYi9jb21wb25lbnRzL01mbS5zdmVsdGUnOwoJaW1wb3J0IEJ1dHRvbiBmcm9tICckbGliL2NvbXBvbmVudHMvQnV0dG9uLnN2ZWx0ZSc7CglpbXBvcnQgeyBJY29uUmVwZWF0IH0gZnJvbSAnQHRhYmxlci9pY29ucy1zdmVsdGUnOwoJaW1wb3J0IFRpbWUgZnJvbSAnJGxpYi9jb21wb25lbnRzL1RpbWUuc3ZlbHRlJzsKCWltcG9ydCBBdmF0YXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL0F2YXRhci5zdmVsdGUnOwoJaW1wb3J0IFZpc2liaWxpdHkgZnJvbSAnJGxpYi9jb21wb25lbnRzL1Zpc2liaWxpdHkuc3ZlbHRlJzsKCglleHBvcnQgbGV0IG5vdGU7CgoJbGV0IGN3T3BlbiA9IGZhbHNlOwo=">{}</script>

{#snippet renderNote(data)}
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
					<Mfm content={data.content} />
				{/if}
			{/key}
		{:else}
			<Mfm content={data.content} />
		{/if}
	</div>
	<NoteFooter note={data} />
{/snippet}

<article>
	{#if note.repeat}
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
	{:else}
		{@render renderNote(note)}
	{/if}
</article>

<style lang="scss" scoped ✂prettier:content✂="CglhcnRpY2xlIHsKCQlwYWRkaW5nOiAxNnB4OwoJCXRyYW5zaXRpb246IDAuMXM7CgoJCS5yZXBlYXRIZWFkZXIgewoJCQlkaXNwbGF5OiBmbGV4OwoJCQlhbGlnbi1pdGVtczogY2VudGVyOwoKCQkJZ2FwOiAxMHB4OwoJCQltYXJnaW4tYm90dG9tOiAxMHB4OwoKCQkJLmxlZnQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDEwcHg7CgkJCQlmbGV4LWdyb3c6IDE7CgoJCQkJYSB7CgkJCQkJZm9udC13ZWlnaHQ6IDYwMDsKCQkJCQljb2xvcjogdmFyKC0tdHgyKTsKCQkJCQl0ZXh0LWRlY29yYXRpb246IG5vbmU7CgkJCQl9CgkJCX0KCgkJCS5yaWdodCB7CgkJCQlkaXNwbGF5OiBmbGV4OwoJCQkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQkJCWdhcDogNXB4OwoJCQkJZm9udC1zaXplOiB2YXIoLS1mcy1zbSk7CgkJCX0KCQl9CgoJCS5jb250ZW50IHsKCQkJbWFyZ2luOiAxMHB4IDA7CgoJCQkuY3cgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQl3aWR0aDogMTAwJTsKCgkJCQljb2xvcjogdmFyKC0tYWMxKTsKCQkJCWZvbnQtd2VpZ2h0OiA1MDA7CgkJCQliYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hYzEtMjUpOwoJCQkJYm9yZGVyLXJhZGl1czogdmFyKC0tYnItbWQpOwoJCQkJcGFkZGluZzogNnB4IDEwcHg7CgoJCQkJYm94LXNoYWRvdzogdmFyKC0tZnVua3ktZWZmZWN0KTsKCQkJCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgkJCQltYXJnaW4tYm90dG9tOiAxMHB4OwoKCQkJCWJ1dHRvbiB7CgkJCQkJZGlzcGxheTogZmxleDsKCQkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgoJCQkJCWJvcmRlcjogbm9uZTsKCQkJCQlib3JkZXItcmFkaXVzOiB2YXIoLS1ici1tZCk7CgkJCQkJcGFkZGluZzogNnB4IDEwcHg7CgoJCQkJCWZvbnQtZmFtaWx5OiB2YXIoLS1mb250KTsKCQkJCQlmb250LWZlYXR1cmUtc2V0dGluZ3M6IHZhcigtLWZvbnQtZmVhdHVyZXMpOwoJCQkJCWZvbnQtc2l6ZTogdmFyKC0tZnMtbWQpOwoJCQkJCWZvbnQtd2VpZ2h0OiA0MDA7CgkJCQkJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoKCQkJCQl0cmFuc2l0aW9uOiAwLjFzLAoJCQkJCXdpZHRoIDBzLAoJCQkJCWhlaWdodCAwcywKCQkJCQlvdXRsaW5lIDBzOwoKCQkJCQljb2xvcjogdmFyKC0tdHgxKTsKCQkJCQliYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsKCgkJCQkJJjpob3ZlciB7CgkJCQkJCWNvbG9yOiB2YXIoLS10eDEpOwoJCQkJCQliYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hYzEtMjUpOwoJCQkJCQlib3gtc2hhZG93OiB2YXIoLS1mdW5reS1lZmZlY3QpOwoJCQkJCX0KCQkJCX0KCgkJCQlzcGFuIHsKCQkJCQlmbGV4LWdyb3c6IDE7CgkJCQl9CgkJCX0KCQl9CgoJCSY6aG92ZXIgewoJCQlib3JkZXItcmFkaXVzOiB2YXIoLS1ici1tZCk7CgkJCWJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnMy0yNSk7CgkJfQoJfQo="></style>
