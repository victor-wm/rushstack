// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as path from 'path';
import * as fs from 'fs';
import * as nodeResolve from 'resolve';

// These helpers avoid taking dependencies on other NPM packages
export class Helpers {
  // Based on Path.isDownwardRelative() from @rushstack/node-core-library
  private static _upwardPathSegmentRegex: RegExp = /([\/\\]|^)\.\.([\/\\]|$)/;

  public static nodeResolveAsync(id: string, opts: nodeResolve.AsyncOpts): Promise<string> {
    return new Promise((resolve: (result: string) => void, reject: (error: Error) => void) => {
      nodeResolve(id, opts, (error: Error, result: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  public static fsExistsAsync(path: fs.PathLike): Promise<boolean> {
    return new Promise((resolve: (result: boolean) => void) => {
      fs.exists(path, (exists: boolean) => {
        resolve(exists);
      });
    });
  }

  // Based on Path.isDownwardRelative() from @rushstack/node-core-library
  public static isDownwardRelative(inputPath: string): boolean {
    if (path.isAbsolute(inputPath)) {
      return false;
    }
    // Does it contain ".."
    if (Helpers._upwardPathSegmentRegex.test(inputPath)) {
      return false;
    }
    return true;
  }
}
