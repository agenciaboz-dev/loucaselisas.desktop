import React, { ForwardedRef } from "react"
import Masked, { MaskedInputProps } from "react-text-mask"

interface IMaskedInputProps extends MaskedInputProps {}

const MaskedInput = React.forwardRef<HTMLElement, IMaskedInputProps>((props, ref: ForwardedRef<HTMLElement>) => {
    const inputRef = (instance: any) => {
        if (instance && ref && typeof ref === "function") {
            ref(instance.inputElement)
        } else if (ref) {
            ;(ref as React.MutableRefObject<HTMLElement | null>).current = instance ? instance.inputElement : null
        }
    }

    return <Masked {...props} ref={inputRef} guide={false} />
})

export default MaskedInput
