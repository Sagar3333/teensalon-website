# GitHub Pages Setup for teensalsi.com

## SSL Certificate Issue Fix

The error "This server could not prove that it is teensalsi.com; its security certificate is from *.github.io" occurs because GitHub Pages needs time to provision SSL certificates for custom domains.

## Steps to Fix SSL Certificate Issue:

### 1. Configure Custom Domain in GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Custom domain**, enter: `teensalsi.com`
5. Check **Enforce HTTPS** (this will be available after SSL is provisioned)
6. Click **Save**

### 2. DNS Configuration

Update your domain's DNS settings to point to GitHub Pages:

#### Option A: Apex Domain (teensalsi.com)
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A  
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### Option B: CNAME (Recommended)
```
Type: CNAME
Name: www
Value: yourusername.github.io
TTL: 3600
```

### 3. Wait for SSL Certificate Provisioning

- GitHub Pages automatically provisions SSL certificates for custom domains
- This process can take **5-60 minutes** to complete
- You'll see a green checkmark next to "Enforce HTTPS" when ready

### 4. Enable HTTPS Enforcement

Once the SSL certificate is provisioned:
1. Go back to **Settings > Pages**
2. Check the **Enforce HTTPS** checkbox
3. Click **Save**

### 5. Verify SSL Certificate

After enabling HTTPS:
- Visit `https://teensalsi.com`
- Check that the SSL certificate shows as valid
- No more security warnings should appear

## Troubleshooting

### If SSL Certificate Still Not Working:

1. **Check DNS Propagation:**
   ```bash
   nslookup teensalsi.com
   ```

2. **Clear Browser Cache:**
   - Hard refresh (Ctrl+F5)
   - Clear browser cache and cookies

3. **Check GitHub Pages Status:**
   - Visit: https://www.githubstatus.com/
   - Look for any GitHub Pages issues

4. **Verify Domain Configuration:**
   - Ensure CNAME file contains: `teensalsi.com`
   - Check that domain is properly configured in GitHub Pages settings

### Alternative: Use GitHub Pages Subdomain

If custom domain SSL continues to have issues, you can temporarily use:
- `https://yourusername.github.io/teensalon-website/`

## Files Included for GitHub Pages:

- ✅ `CNAME` - Custom domain configuration
- ✅ `.github/workflows/deploy.yml` - Automated deployment
- ✅ `_github-pages.yml` - Jekyll configuration
- ✅ All redirect files (`.htaccess`, `_redirects`, etc.)

## Expected Timeline:

- **DNS Propagation:** 5-30 minutes
- **SSL Certificate Provisioning:** 5-60 minutes
- **Total Setup Time:** 10-90 minutes

## Support:

If issues persist after 2 hours:
1. Check GitHub Pages documentation
2. Contact your domain registrar
3. Verify DNS settings are correct
