//
//  SwiftModule.swift
//  iOSSwiftComponet
//
//  Created by hcl on 2022/9/4.
//

import Foundation
import iOSConnect

@objc(SwiftModule)
public class SwiftModule: BaseModule {
    public override func module(_ module: BaseModule?, registStore store: ModuleStore?) {
        store?.registProtocol(NSProtocolFromString("SwiftProtocol")!, with: {
            let swiftVc = SwiftController.init()
            return swiftVc
        })
    }
}
