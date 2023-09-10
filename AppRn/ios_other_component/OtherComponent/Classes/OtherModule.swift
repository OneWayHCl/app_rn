//
//  OtherModule.swift
//  OtherComponent
//
//  Created by hcl on 2022/3/2.
//

import Foundation
import iOSConnect

@objc(OtherModule)
public class OtherModule: BaseModule {
    public override func module(_ module: BaseModule?, registStore store: ModuleStore?) {
        store?.registProtocol(NSProtocolFromString("OtherProtocol")!, with: {
            let otherVc = OtherController.init()
            otherVc.name = "Other-Name"
            return otherVc
        })
    }
}
