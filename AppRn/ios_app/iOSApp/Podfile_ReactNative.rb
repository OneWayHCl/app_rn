
#!/bin/bash

# 脚本文件作用：
# 1. 如果没有本地react native代码目录rnPath，创建目录，并拉取指定分支branchName的代码；
#    如果本地分支不一样，切换分支。
# 2. 为react native代码目录安装react native依赖库node_modules(yarn install),
#    并且修改react native pod配置文件react_native_pods的相对路径：
#    "../node_modules/react-native" 修改为 "#{rnPath}/node_modules/react-native".
#    修改的目的是在pod react native依赖库时，能从本地本路找到响应的库文件。

# react native代码仓库url
$gitUrl="git@github.com:OneWayHCl/ios_home_component.git"

# 创建react native本地目录，拉取指定分支代码
def initReactNative(rnPath, branchName)
    
    puts "=============== 执行RN脚本：开始 ==============="
    
    # 创建react native仓库本地目录
    if Dir::exist?(rnPath)
        puts "RN目录：#{rnPath}已存在"
    else
        Dir::mkdir(rnPath)
        puts "RN目录：#{rnPath}目录创建成功"
    end

    # 判断RN目录是否为空
    if Dir::empty?(rnPath)
        # RN目录为空，拉取指定分支最新代码
        puts "开始拉取RN分支#{branchName}的最新代码"
#        if system "git clone -b #{branchName} #{$gitUrl} #{rnPath}"
#            puts "拉取RN分支#{branchName}的最新代码 -- 成功"
#        else
#            puts "拉取RN分支#{branchName}的最新代码 -- 失败，请检查原因后再执行"
#            Kernel.exit(false)
#        end
    else
        # RN目录不为空
        # 切换目录到rnPath,为了下面可能存在的git操作
        curPath=Dir::pwd
        if Dir.chdir(rnPath)
            # 本地RN文件存在，获取分支名称，chomp去掉尾部的换行符
            curBranchName = `git symbolic-ref --short HEAD`.chomp!
            
            if curBranchName == branchName
#                puts "分支名相等"
                # 不管本地代码是否有更新，都拉取最新代码，
                if system "git pull origin #{branchName}"
                    puts "拉取RN分支#{branchName}的最新代码 -- 成功"
                else
                    puts "拉取RN分支#{branchName}的最新代码 -- 失败，请检查原因后再执行"
#                    Kernel.exit(false)
                end
            else
#                puts "分支名不相等"
                # 判断本地是否有修改
                if `git status -s`.chomp!
                    puts "RN本地有修改，并且RN本地分支#{curBranchName}和主工程的RN分支#{branchName}不一样，请先提交RN的本地修改内容，再执行"
#                    Kernel.exit(false)
                else
                    puts "RN本地没有修改， 准备从RN分支#{curBranchName}切换到#{branchName}"
                    if system "git checkout #{branchName}"
                        puts "切换分支成功: #{curBranchName} => #{branchName}"
                    else
                        puts "切换分支失败。请检查失败原因，或者手动切换"
#                        Kernel.exit(false)
                    end
                end
            end
        else
            puts "不存在#{rnPath}文件夹"
            Kernel.exit(false)
        end
        
        # 操作完毕后，回到主工程目录
        Dir.chdir(curPath)
    end
    
    # 开始配置RN环境
    installReactNativeSdk(rnPath)
    
    puts "=============== 执行RN脚本：结束 ==============="
end

# 安装react native依赖库
def installReactNativeSdk(rnPath)
    # 设置 react_native_pods.rb 文件路径
    node_module_pod_file = "#{rnPath}/node_modules/react-native/scripts/react_native_pods.rb"
    
    # 每次都要安装RN环境，因为不确定package.json是否新增加了依赖库
    puts "RN环境安装，准备下载···"
    # 判断是否安装 node环境
    if system "node -v > /dev/null"
        # 切换目录到rnPath
        curPath=Dir::pwd
        if Dir.chdir(rnPath)
            # 使用 yarn 下载依赖
            # --frozen-lockfile目的是为了不修改yarn.lock文件，
            # 如果lock和packjson文件版本不匹配，会报错，需要手动解决版本一致问题
            if system "yarn install --frozen-lockfile"
                puts "RN环境安装成功！"
                # 安装成功后，回到当前目录后，修改路径
                if Dir.chdir(curPath)
                   # 修改路径
                   changePath(node_module_pod_file, rnPath)
                end
            else
                puts "RN环境安装失败！请安装yarn及其他RN开发环境。或者检查package.json和yarn.lock版本是否匹配，手动解决后再执行"
                Kernel.exit(false)
            end
        else
            puts "不存在#{rnPath}文件夹"
            Kernel.exit(false)
        end
    else
        #如果没有安装，提示自行安装node环境
        puts "RN环境下载失败！请先安装node环境"
        Kernel.exit(false)
    end
end

# 将 react_native_pods.rb 文件中 ../node_modules 目录改为 #{rnPath}/node_modules
def changePath(node_module_pod_file, rnPath)
    fileText = File.read(node_module_pod_file)
    fileReplaceText = fileText.gsub(/\.\.\/node_modules/, "#{rnPath}/node_modules")
    File.open(node_module_pod_file, "w") {|file| file.puts fileReplaceText}
end


