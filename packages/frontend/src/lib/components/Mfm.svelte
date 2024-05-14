<script>
    import * as mfm from 'mfm-js';

    export let content;
    export let simple = false;

    let mfmTree = [];

    if (simple) {
        mfmTree = mfm.parseSimple(content);
    } else {
        mfmTree = mfm.parse(content);
    }

    function basicRender(object) {
        if (object.type === 'text') {
            return `<span>${object.props.text}</span>`
        } else if (object.type === 'bold') {
            let collectedOutput = '';
                object.children.forEach((child) => {
                    collectedOutput = collectedOutput+basicRender(child)
                })
                console.log(collectedOutput)
                return `<strong">`+collectedOutput+`</strong>`;
        } else if (object.type === 'fn') {
            if (object.props.name === 'spin') {
                let collectedOutput = '';
                object.children.forEach((child) => {
                    collectedOutput = collectedOutput+basicRender(child)
                })
                console.log(collectedOutput)
                return `<span class="mfm-spin">`+collectedOutput+`</span>`;
            } else if (object.props.name === 'x2') {
                let collectedOutput = '';
                object.children.forEach((child) => {
                    collectedOutput = collectedOutput+basicRender(child)
                })
                console.log(collectedOutput)
                return `<span class="mfm-x2">`+collectedOutput+`</span>`;
            } else if (object.props.name === 'x3') {
                let collectedOutput = '';
                object.children.forEach((child) => {
                    collectedOutput = collectedOutput+basicRender(child)
                })
                console.log(collectedOutput)
                return `<span class="mfm-x3">`+collectedOutput+`</span>`;
            } else if (object.props.name === 'x4') {
                let collectedOutput = '';
                object.children.forEach((child) => {
                    collectedOutput = collectedOutput+basicRender(child)
                })
                console.log(collectedOutput)
                return `<span class="mfm-x4">`+collectedOutput+`</span>`;
            }
        }
    }

    console.log(mfmTree)
</script>

<p class=mfmCtn>
    {#each mfmTree as object}
        {#if object.type === 'text'}
            <span>{object.props.text}</span>
        {:else if object.type === 'bold'}
            <strong>
                    {#each object.children as child}
                        {@html basicRender(child)}
                    {/each}
            </strong>
        {:else if object.type === 'fn'}
            {#if object.props.name === "spin"}
                <span class=mfm-spin>
                    {#each object.children as child}
                        {@html basicRender(child)}
                    {/each}
                </span>
            {:else if object.props.name === 'x2'}
                <span class=mfm-x2>
                    {#each object.children as child}
                        {@html basicRender(child)}
                    {/each}
                </span>
            {:else if object.props.name === 'x3'}
                <span class=mfm-x3>
                    {#each object.children as child}
                        {@html basicRender(child)}
                    {/each}
                </span>
            {:else if object.props.name === 'x4'}
                <span class=mfm-x4>
                    {#each object.children as child}
                        {@html basicRender(child)}
                    {/each}
                </span>
            {/if}
        {/if}
    {/each}
</p>
<br>
<p>
    Raw MFM Tree:
    <code>{JSON.stringify(mfmTree)}</code>
</p>

<style lang=scss>
@keyframes mfm-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.mfmCtn {
    > * {
        display: inline-block;
    }
}

.mfm-spin {
    animation: 1.5s linear 0s infinite normal none running mfm-spin;
}

.mfm-x2 {
    font-size: 200%;
}

.mfm-x3 {
    font-size: 300%;
}

.mfm-x4 {
    font-size: 400%;
}
</style>