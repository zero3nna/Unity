#Multimediaproduktion - Game Development with Unity 3d

*Repository for Game Modification*

## <a name='TOC'>Inhaltsverzeichnis</a>

  1. [Installation & Setup Local Clone] (#install)
  2. [Use & Restrictions in GitHub] (#howto)

## <a name='install'>Installation & Setup Local Clone</a>

  - **Get Git and use it on Windows**:

  1. go to [windows.github.com](windows.github.com) and download the latest version of **GitHubSetup.exe**
  2. install and log in to your github-account
  3. on the left hand side go to your repositories on your account and to **Zero3nna/Unity**, choose clone repository
  4. setup unity3d by open a project, open other..., and navigate to the repository on your local hard drive

  - **Get Git and use it on Mac**:

  1. go to [mac.github.com](mac.github.com) and download the latest version of **mac_GibHub for Mac __.zip**
  2. extract the zip file and paste it to your programs folder
  3. Login to your github account and go to your repository: github/"Username" on the left side
  4. clone the repository to your local hard drive
  5. setup unity3d by open a project, open other..., and navigate to the repository on your local hard drive

**[[⬆]](#TOC)**

## <a name='how to'>How to work</a>

  - **Use & Restrictions in GitHub**:

  + befor starting your work, sync your local branch with the github **`master branch`**
  + in unity3d, check Edit->Project Settings->Editor and set the Version Control Mode to `Meta Files`
  + use your **`subbranch` to commit, do not use the `master branch` or other unknown `branches` to commit your changes**
  + load your unity project and create a new scene named after your github username, for example `Zero3nna.unity`
  + to merge a scene, first read this article about [merging with unity3d (free)](http://devblog.phillipspiess.com/2012/06/17/unity-3-5-free-and-source-control-lessons-learned-from-7dfps/)
  + `prefabs` and `scenes` are binary files and can't be easily version controlled
  + to work on a specific file it is recommend to first check under issues if it is available
  + **to `reserve a file`, create a issue with its `name` as `title`**
  + **after editing merge it to main, comment the merge in your issue and close it**
  + to get an idea, take a look at this [example](https://github.com/Zero3nna/Unity/wiki/Reserve-Files) in the wiki
  + working pipeline: **`Reserve -> merge to main -> Unreserve -> merge to feature branch – >Reserve`**

**[[⬆]](#TOC)**

