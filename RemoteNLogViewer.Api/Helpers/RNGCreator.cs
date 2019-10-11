using System;
using System.Security.Cryptography;

namespace RemoteNLogViewer.Api
{
    public static class RNGCreator
    {
        public static string GetKey(int size)
        {
            string hash = "";
            byte[] data = new byte[size];
            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                crypto.GetNonZeroBytes(data);
            }

            using (SHA384 sha384 = SHA384.Create())
            {
                hash = BitConverter.ToString(sha384.ComputeHash(data)).Replace("-", String.Empty);
            }

            return hash.Substring(0, 32);
        }
    }
}