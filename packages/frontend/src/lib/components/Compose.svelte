<script ✂prettier:content✂="CglpbXBvcnQgSW5wdXQgZnJvbSAnJGxpYi9jb21wb25lbnRzL0lucHV0LnN2ZWx0ZSc7CglpbXBvcnQgQnV0dG9uIGZyb20gJyRsaWIvY29tcG9uZW50cy9CdXR0b24uc3ZlbHRlJzsKCWltcG9ydCBBdmF0YXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL0F2YXRhci5zdmVsdGUnOwoJaW1wb3J0IGxvY2Fsc3RvcmUgZnJvbSAnJGxpYi9sb2NhbHN0b3JlJzsKCglpbXBvcnQgewoJCUljb25DaGFydEJhciwKCQlJY29uTW9vZFNtaWxlLAoJCUljb25QYXBlcmNsaXAKCX0gZnJvbSAnQHRhYmxlci9pY29ucy1zdmVsdGUnOwoJaW1wb3J0IFZpc2liaWxpdHkgZnJvbSAnJGxpYi9jb21wb25lbnRzL1Zpc2liaWxpdHkuc3ZlbHRlJzsKCWltcG9ydCBjcmVhdGVOb3RlIGZyb20gJyRsaWIvYXBpL25vdGUvY3JlYXRlJzsKCglsZXQgc2VsZjsKCglmdW5jdGlvbiB1cGRhdGVTZWxmKCkgewoJCWxldCBncmFiYmVkU2VsZiA9IGxvY2Fsc3RvcmUuZ2V0KCdzZWxmJyk7CgoJCWlmIChncmFiYmVkU2VsZikgewoJCQlzZWxmID0gSlNPTi5wYXJzZShncmFiYmVkU2VsZik7CgkJfQoJfQoKCXVwZGF0ZVNlbGYoKTsKCglsZXQgcmVzdWx0OwoKCWxldCBub3RlID0gewoJCWN3OiAnJywKCQljb250ZW50OiAnJywKCQl2aXNpYmlsaXR5OiBsb2NhbHN0b3JlLmdldCgnZGVmYXVsdFZpc2liaWxpdHknKSwKCQlyZXBlYXQ6ICcnCgl9OwoKCWFzeW5jIGZ1bmN0aW9uIHBvc3QoKSB7CgkJaWYgKG5vdGUuY29udGVudC5sZW5ndGggPj0gMSkgewoJCQlyZXN1bHQgPSBhd2FpdCBjcmVhdGVOb3RlKG5vdGUpOwoJCQljb25zb2xlLmxvZyhyZXN1bHQpOwoJCX0KCX0K">{}</script>

<div class="compose">
	<div class="top">
		<div class="left">
			<Avatar user={self} size="35px" />
		</div>
		<div class="right">
			<Button transparent centered nm>
				<Visibility visibility={note.visibility} />
			</Button>
		</div>
	</div>
	<Input placeholder="Content warning" bind:value={note.cw} wide></Input>
	<Input placeholder="What's going on?" bind:value={note.content} wide big
	></Input>
	<Input placeholder="Repeat ID" bind:value={note.repeat} wide></Input>
	<div class="btm">
		<div class="left">
			<Button transparent centered nm>
				<IconPaperclip size="var(--fs-lg)" />
			</Button>
			<Button transparent centered nm>
				<IconChartBar size="var(--fs-lg)" />
			</Button>
			<Button transparent centered nm>
				<IconMoodSmile size="var(--fs-lg)" />
			</Button>
		</div>
		<div class="right">
			<Button
				accent={note.content.length >= 1}
				nm
				on:click={async () => await post()}>Post</Button
			>
		</div>
	</div>
</div>

<style lang="scss" scoped ✂prettier:content✂="CgkuY29tcG9zZSB7CgkJLnRvcCB7CgkJCW1hcmdpbi1ib3R0b206IDEwcHg7CgkJfQoKCQkuYnRtIHsKCQkJbWFyZ2luLXRvcDogMTBweDsKCQl9CgoJCS5idG0sCgkJLnRvcCB7CgkJCWRpc3BsYXk6IGZsZXg7CgkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCWdhcDogMTBweDsKCgkJCS5sZWZ0IHsKCQkJCWRpc3BsYXk6IGZsZXg7CgkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJb3ZlcmZsb3cteDogc2Nyb2xsOwoJCQkJZmxleC1ncm93OiAxOwoJCQl9CgoJCQkucmlnaHQgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCX0KCQl9Cgl9Cg=="></style>
