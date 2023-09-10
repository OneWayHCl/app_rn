//
//  OtherController.swift
//  OtherComponent
//
//  Created by apple on 2022/2/10.
//

import Foundation
import UIKit
import iOSConnect

@objc(OtherController)
public class OtherController: UIViewController, OtherProtocol {
    public var name: String = "Other"
    
    var centerlabel: UILabel!
    
    public override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    public override func viewDidLoad(){
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white
        self.navigationItem.title = "OtherSwift控制器"
        self.setupCustomView()
    }
    
    func setupCustomView(){
        centerlabel = UILabel.init(frame: CGRect.init(x: 100, y: 400, width: 200, height: 50))
        centerlabel.backgroundColor = UIColor.yellow
        view.addSubview(centerlabel)
        centerlabel.text = name
    }
}
